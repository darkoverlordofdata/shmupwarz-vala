module schmupwarz {
  "use strict";

  const color = '#c0c0c0';

  export enum Layer {
    DEFAULT,
    BACKGROUND,
    TEXT,
    LIVES,
    MINES,
    ACTORS_1,
    ACTORS_2,
    ACTORS_3,
    PARTICLES
  }

  export enum Effect {
    PEW,
    ASPLODE,
    SMALLASPLODE
  }
}