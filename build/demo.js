"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let poke;
const getData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let pokemon = yield data.json();
    poke = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.back_default,
        type: pokemon.types[0].type.name,
    };
    return poke;
});
const getAllData = () => __awaiter(void 0, void 0, void 0, function* () {
    let arr = [];
    let ran = Math.floor(Math.random() * 100) + 1;
    for (let index = ran; index < ran + 10; index++) {
        arr.push(getData(index));
    }
    return Promise.all(arr);
});
const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
};
getAllData().then((datas) => {
    let list = [...datas, ...datas];
    let shuffledArray = shuffle(list);
    console.log(shuffledArray);
    let datalist = ``;
    shuffledArray.forEach(function (value) {
        datalist += `<img id="${value.id}" src="${value.image}" class="img-thumbnail">`;
    });
    let images = document.getElementById("images");
    images.innerHTML = datalist;
});
