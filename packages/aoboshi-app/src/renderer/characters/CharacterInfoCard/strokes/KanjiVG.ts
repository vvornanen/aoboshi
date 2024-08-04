import { getCodePoint } from "@vvornanen/aoboshi-core/characters";
import * as styles from "./Stroke.css";

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
    return getCodePoint(literal).toString(16).padStart(5, "0");
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
      path.classList.remove(styles.stroke, styles.currentStroke);
      path.classList.add(styles.hiddenStroke);
    });

    Array.from({ length: n }, (x, i) => i + 1).forEach((i) => {
      const path = this.element.querySelector(`#kvg\\:${this.getCode()}-s${i}`);

      if (!path) {
        return;
      }

      path.classList.remove(styles.hiddenStroke);
      path.classList.add(styles.stroke);

      if (i === n) {
        path.classList.add(styles.stroke, styles.currentStroke);
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
