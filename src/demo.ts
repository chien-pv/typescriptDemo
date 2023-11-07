let poke: {
  id: number;
  name: string;
  image: string;
  type: string;
};

const getData = async (id: number) => {
  let data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let pokemon: any = await data.json();
  poke = {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.back_default,
    type: pokemon.types[0].type.name,
  };
  return poke;
};

const getAllData = async () => {
  let arr = [];
  let ran = Math.floor(Math.random() * 100) + 1;
  for (let index = ran; index < ran + 10; index++) {
    arr.push(getData(index));
  }

  return Promise.all(arr);
};

const shuffle = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

getAllData().then((datas) => {
  let list = [...datas, ...datas];
  let shuffledArray = shuffle(list);
  console.log(shuffledArray);
  let datalist: string = ``;
  shuffledArray.forEach(function (value) {
    datalist += `<img id="${value.id}" src="${value.image}" class="img-thumbnail">`;
  });

  let images = document.getElementById("images") as HTMLElement;
  images.innerHTML = datalist;
});
