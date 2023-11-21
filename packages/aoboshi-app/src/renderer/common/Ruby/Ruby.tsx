import { parseRuby } from "@vvornanen/aoboshi-core";
import { rubyText as rubyTextClass } from "./Ruby.css";

export type RubyProps = {
  /** Text in the bracket syntax used by Anki Japanese Support addon */
  text: string;
};

export const Ruby = ({ text }: RubyProps) => {
  const ruby = parseRuby(text);

  return (
    <>
      {ruby.map(({ text, rubyText }) => (
        <ruby key={text + rubyText}>
          {text}
          {rubyText && <rt className={rubyTextClass}>{rubyText}</rt>}
        </ruby>
      ))}
    </>
  );
};
