import { createSignal, Show, type Component } from "solid-js";
import type { FavoritePokemon } from "src/interfaces/favorite-pokemon";

export interface Props {
    pokemon: FavoritePokemon
}

export const FavoritePokemonCard: Component<Props> = ({pokemon}) => {
    const [isVisible, setIsVisible] = createSignal(true);
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
   
    function deleteFav() {
        const favs: FavoritePokemon[] = JSON.parse(localStorage.getItem("favs") ?? "[]");

        localStorage.setItem(
            "favs",
            JSON.stringify(favs.filter(
                (p) => p.id !== pokemon.id
            ))
        );

        setIsVisible(false);
    }

    return (
        <Show when={isVisible()}>
            <div class="flex flex-col justify-center items-center">
                <a href={`/pokemons/${pokemon.name}`} class="flex flex-col items-center justify-center">
                    <img
                        src={imgSrc}
                        width="70"
                        style={`view-transition-name: ${pokemon.name}-img`}
                    ></img>
                    <p class="capitalize">
                        #{pokemon.id} {pokemon.name}
                    </p>
                </a>
                <button class="text-red-400" onClick={deleteFav}>Borrar</button>
            </div>
        </Show>
    );
}