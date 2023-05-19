import { parseRuby } from "@vvornanen/aoboshi-core";
import { styled } from "@mui/material";

export type RubyProps = {
  /** Text in the bracket syntax used by Anki Japanese Support addon */
  text: string;
};

const RubyText = styled("rt")(() => ({
  fontSize: "inherit",
  zoom: "50%",
  userSelect: "none",
}));

export const Ruby = ({ text }: RubyProps) => {
  const ruby = parseRuby(text);

  return (
    <>
      {ruby.map(({ text, rubyText }) => (
        <ruby key={text + rubyText}>
          {text}
          {rubyText && <RubyText>{rubyText}</RubyText>}
        </ruby>
      ))}
    </>
  );
};
