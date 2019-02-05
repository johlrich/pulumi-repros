var defaultsForThing = {
  config: {
    x: "x",
    y: "y"
  }
}

export function getX() {
  return defaultsForThing.config.x
}

export function getAll() {
  const x = getX()
  return { x, y: defaultsForThing.config.y }
}