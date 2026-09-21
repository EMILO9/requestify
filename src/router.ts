export function FindMatchingRoute(routes: unknown) {
  for (const route of routes) {
    const isMatch = route.isMatch(path);
    const conditions = [isMatch, route.methods.includes(method)];
    if (conditions) return { route, params: isMatch.params };
  }
  return null;
}
