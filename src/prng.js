import SeedRandom from 'seedrandom';

export default function getPRNG (seed) {
  return new SeedRandom(seed, {
    pass: (prng, seed) => {
      return {
        prng,
        seed_used: seed,
      };
    }
  });
}