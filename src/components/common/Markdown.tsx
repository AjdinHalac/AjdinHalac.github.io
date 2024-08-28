import { FC } from "react";
import ReactMarkdown from "react-markdown";
import Renderer from "./Renderer";

type MarkdownProps = {
  markdown?: string;
};

const Markdown: FC<MarkdownProps> = ({ markdown }: MarkdownProps) => {
  return (
    <ReactMarkdown components={Renderer()} children={markdown} />
  )
}

export default Markdown;