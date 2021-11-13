export function passwordIsStrong(value: string): boolean {
  let r =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/;

  return r.test(value);
}
