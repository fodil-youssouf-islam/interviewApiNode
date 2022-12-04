import {FastifyReply, FastifyRequest} from "fastify";
import axios from 'axios';

export async function getPokemonByName(request: FastifyRequest, reply: FastifyReply) {
    let name: string = request.params['name']

    reply.headers['Accept'] = 'application/json'

    let urlApiPokeman = `https://pokeapi.co/api/v2/pokemon/`;

    let params = {}

    name != null
        ? name.trim() != ''
            ? (params["name"] = name, urlApiPokeman = urlApiPokeman + name)
            : (urlApiPokeman = urlApiPokeman + '"?offset=20"', urlApiPokeman = urlApiPokeman + "&limit=20")
        : (urlApiPokeman = urlApiPokeman + '"?offset=20"', urlApiPokeman = urlApiPokeman + "&limit=20")
    console.log(urlApiPokeman);

    let response = await axios.get(urlApiPokeman, {
        headers: {Accept: 'application/json', 'Accept-Encoding': 'identity'},
        params: {trophies: true}
    });

    console.log('request response: ', response.data);

    if (response.data == null) {
        reply.code(404)
    }

    computeResponse(response.data, reply)

    reply.send(response)

    return reply
}

export const computeResponse = async (response, reply: FastifyReply) => {
    const resp = response as any

    console.log('resp types: ', resp.types);

    let UrlTypes: string[] = resp.types.map(type => type.type).map(type => type.url);

    console.log('UrlTypes: ', UrlTypes);

    let pokemonTypes: any = []

    for (const url of UrlTypes) {
        // axios.request({hostname: url}, (response: any) => pokemonTypes.push(response))
        pokemonTypes.push((await axios.get(url, {
            headers: {Accept: 'application/json', 'Accept-Encoding': 'identity'},
            params: {trophies: true}
        })).data);
    }

    if (pokemonTypes == undefined)
        throw pokemonTypes


    response.stats.forEach(element => {
        var stats = []

        pokemonTypes.map(pok =>
            pok.stats.map(st =>
                st.stat.name.toUpperCase() == element.stat.name
                    ? stats.push(st.base_stat)
                    : ([])
            )
        )

        if (stats) {
            let avg = stats.reduce((a, b) => a + b) / stats.length
            element.averageStat = avg
        } else {
            element.averageStat = 0
        }
    });

}
