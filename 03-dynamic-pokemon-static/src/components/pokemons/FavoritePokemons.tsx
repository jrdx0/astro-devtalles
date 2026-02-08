import { createSignal, For } from "solid-js";
import type { FavoritePokemon } from "src/interfaces/favorite-pokemon";
import { FavoritePokemonCard } from "./FavoritePokemonCard";

function getLocalStoragePokemons(): FavoritePokemon[] {
    return JSON.parse(localStorage.getItem("favs") ?? "[]");
}

export const FavoritePokemons = () => {
    const [pokemons, setPokemons] = createSignal(getLocalStoragePokemons());

    return (
        <div class="grid grid-cols-2 sm:grid-cols-4 mt-5">
            <For each={pokemons()}>
                {
                    pokemon => <FavoritePokemonCard pokemon={pokemon} />
                }
            </For>
        </div>
    )
}