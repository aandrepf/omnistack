const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

// 5 tipos de metodos em um controller: index(mostrar listas), show(mostrar unico), store(criar), update(atualizar), destroy(deletar)
module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            // no caso de name, se não existir o valor padrão dele é o valor de 'login'
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
               github_username,
               name,
               bio,
               avatar_url,
               techs: techsArray,
               location,
            });

            // Filtrar as conexoes que estão a no max 10km de distancia
            // e que o novo dev tenha pelo menos uma das techs filtradas
            const sendSocketMessateTo = findConnections(
                {latitude, longitude},
                techsArray
            );

            sendMessage(sendSocketMessateTo, 'new-dev', dev);

            console.log('sendSocket', sendSocketMessateTo);
        }
        
        return response.json(dev);
    },

    async update(request, response) {
        const { id } = request.params;
        const data = request.body;

        if(data.techs) {
            data.techs = parseStringAsArray(data.techs);
        }

        const dev = await Dev.findByIdAndUpdate(id, data, { new: true });

        return response.json(dev);
    },

    async destroy(request, response) {
        const { id } = request.params;

        await Dev.findByIdAndDelete(id);

        return response.json({ message: 'dev removido com sucesso!' });
    }
};
