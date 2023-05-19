import { parseRuby } from "@vvornanen/aoboshi-core";

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
          {rubyText && (
            <rt
              style={{
                fontSize: "100%",
                zoom: "50%",
                userSelect: "none",
              }}
            >
              {rubyText}
            </rt>
          )}
        </ruby>
      ))}
    </>
  );
};
