export default class Helper {
  static getDataId(selector: string) {
    return `[data-testid = "${selector}"]`
  }
}
