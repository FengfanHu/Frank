import View from "../Common/View";
import './index.scss';
import { Remarkable } from 'remarkable';
import rkatex from './rkatex';
import hljs from "highlight.js";
import 'highlight.js/styles/googlecode.css';

function MarkDown (props) {
  const { content, links, style } = props;

  const linkList = [];
  const md = new Remarkable('full',{
    html: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}

      return ''; // use external default escaping
    }
  });

  md.use(rkatex);
  md.renderer.rules.heading_open = function (tokens, idx /*, options, env */ ) {
    const anchorName = tokens[idx + 1].content;
    linkList.push(anchorName);
    const anchor = `<a name="${anchorName}" ></a><br/>`;
    return anchor + `<h${tokens[idx].hLevel } >`;
  };
  md.renderer.rules.heading_close = function (tokens, idx /*, options, env */ ) {
    return '</h' + tokens[idx].hLevel + ' > ';
  };
  md.renderer.rules.image = function (tokens, idx) {
    return `<img class="markdownImg" src="${tokens[idx].src}" alt="${tokens[idx].alt}" />`
  }

  const renderContent = md.render(content);
  if (links) links.current.list = linkList;

  return (
    <View
      style={{ ...style }}
      className={'markdown'}
      dangerouslySetInnerHTML={{
      __html: renderContent
      }}
    />
  )
}

export default MarkDown;
