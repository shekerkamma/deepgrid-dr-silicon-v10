// The one player for narrated films: native controls, no autoplay, poster first, English captions on by default.
import type { Film } from './dg32-films';

export function FilmPlayer({ film }: { film: Film }) {
  return (
    <video controls preload="none" poster={film.poster} playsInline width={1600} height={900}>
      <source src={film.src} type="video/mp4" />
      <track kind="captions" src={film.vtt} srcLang="en" label="English" default={!film.burned} />
    </video>
  );
}
