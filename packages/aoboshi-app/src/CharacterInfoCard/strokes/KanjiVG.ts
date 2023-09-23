/**
 * A tool for handling KanjiVG svg data.
 */
export class KanjiVG {
  constructor(
    public literal: string,
    public element: SVGSVGElement,
  ) {}

  /**
   * Returns the code used in KanjiVG filenames for the given character.
   *
   * @param literal
   */
  static getCodeForLiteral(literal: string): string {
    const codePoint = literal.codePointAt(0);

    if (!codePoint) {
      throw new Error(`Invalid literal [${literal}]`);
    }

    return codePoint.toString(16).padStart(5, "0");
  }

  /**
   * Parses element from xml string.
   *
   * @param literal character
   * @param data xml string
   */
  static fromString(literal: string, data: string): KanjiVG | null {
    const parser = new window.DOMParser();
    const document = parser.parseFromString(data, "text/xml");
    const element = document.querySelector("svg");

    if (!element) {
      return null;
    }

    return new KanjiVG(literal, element);
  }

  /**
   * Fetches KanjiVG data for the given character.
   *
   * @param literal
   * @return svg string or null if data was not found
   */
  static async fetch(literal: string): Promise<KanjiVG | null> {
    const code = KanjiVG.getCodeForLiteral(literal);
    const response = await fetch(`/kanjivg/${code}.svg`);

    if (response.status !== 200) {
      return null;
    }

    const data = await response.text();
    return KanjiVG.fromString(literal, data);
  }

  getCode(): string {
    return KanjiVG.getCodeForLiteral(this.literal);
  }

  appendTo(element: Element): void {
    element.append(this.element);
  }

  /**
   * Removes fixed size so that it fits to parent element dimensions.
   */
  fitParent(): void {
    this.element.removeAttribute("height");
    this.element.removeAttribute("width");
  }

  removeStrokeNumbers(): void {
    const strokeNumbers = this.element.querySelector(
      `#kvg\\:StrokeNumbers_${this.getCode()}`,
    );

    if (strokeNumbers) {
      strokeNumbers.remove();
    }
  }

  /**
   * Highlights the current stroke and hides following strokes.
   *
   * Just annotates path with classes `stroke`, `current-stroke` and
   * `hidden-stroke`. Styles for these paths should be defined separately.
   *
   * @param n current stroke
   */
  showStroke(n: number): void {
    this.element.querySelectorAll("path").forEach((path) => {
      path.classList.remove("stroke", "current-stroke");
      path.classList.add("hidden-stroke");
    });

    Array.from({ length: n }, (x, i) => i + 1).forEach((i) => {
      const path = this.element.querySelector(`#kvg\\:${this.getCode()}-s${i}`);

      if (!path) {
        return;
      }

      path.classList.remove("hidden-stroke");
      path.classList.add("stroke");

      if (i === n) {
        path.classList.add("stroke", "current-stroke");
      }
    });
  }

  /**
   * Serializes the element to string.
   *
   * @return xml string
   */
  toString(): string {
    const serializer = new XMLSerializer();
    return serializer.serializeToString(this.element);
  }
}
