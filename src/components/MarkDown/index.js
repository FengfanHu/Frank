import View from "../Common/View";
import './index.scss';
import { Remarkable } from 'remarkable';
import hljs from "highlight.js";
import 'highlight.js/styles/github-gist.css';
import { forwardRef } from 'react';

function MarkDown (props) {
  const { content, links } = props;

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

  md.renderer.rules.heading_open = function (tokens, idx /*, options, env */ ) {
    const anchorName = tokens[idx + 1].content;
    linkList.push(anchorName);
    const anchor = `<a name="${encodeURI(anchorName)}" ></a><br/>`;
    return anchor + `<h${tokens[idx].hLevel } >`;
  };
  md.renderer.rules.heading_close = function (tokens, idx /*, options, env */ ) {
    return '</h' + tokens[idx].hLevel + ' > ';
  };

  const renderContent = md.render(content);
  links.current.list = linkList;

  return (
    <View
      className={'markdown'}
      dangerouslySetInnerHTML={{
      __html: renderContent
      }}
    />
  )
}

export default MarkDown;
