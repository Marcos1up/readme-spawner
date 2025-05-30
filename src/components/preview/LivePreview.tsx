import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import Image from "next/image";

interface LivePreviewProps {
  content: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({ content }) => {
  return (
    <div className="live-preview">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          //customizar render de headers
          h1: ({ children }) => <h1 className="markdown-h1">{children}</h1>,
          h2: ({ children }) => <h2 className="markdown-h2">{children}</h2>,
          h3: ({ children }) => <h3 className="markdown-h3">{children}</h3>,
          h4: ({ children }) => <h4 className="markdown-h4">{children}</h4>,
          h5: ({ children }) => <h5 className="markdown-h5">{children}</h5>,
          h6: ({ children }) => <h6 className="markdown-h6">{children}</h6>,

          //customizar render de p
          p: ({ children }) => <p className="markdown-p">{children}</p>,

          //custpomizar render de listas
          ul: ({ children }) => <ul className="markdown-ul">{children}</ul>,
          ol: ({ children }) => <ol className="markdown-ol">{children}</ol>,
          li: ({ children }) => <li className="markdown-li">{children}</li>,

          //customizar renderizado de los links
          a: ({ href, children }) => (
            <a href={href} className="markdown-link" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),

          //customizar renderizado de los codes
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || ""); //expresion regular para detectar el lenguaje
            const isInline = !match;

            return isInline ? (
              <code className="markdown-inline-code" {...props}>
                {children}
              </code>
            ) : (
              <pre className="markdown-pre">
                <code className={`markdown-code ${className || ""}`} {...props}>
                  {children}
                </code>
              </pre>
            );
          },

          //customizar renderizado de blockquotes
          blockquote: ({ children }) => (
            <blockquote className="markdown-blockquote">{children}</blockquote>
          ),

          //custom renderizado de tablas
          table: ({ children }) => (
            <div className="table-container">
              <table className="markdown-table">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="markdown-thead">{children}</thead>,
          tbody: ({ children }) => <tbody className="markdown-tbody">{children}</tbody>,
          tr: ({ children }) => <tr className="markdown-tr">{children}</tr>,
          th: ({ children }) => <th className="markdown-th">{children}</th>,
          td: ({ children }) => <td className="markdown-td">{children}</td>,

          hr: () => <hr className="markdown-hr" />,

          //customizar renderizado de imgs
          img: ({ src, alt }) => {
            if (!src) return null;
            return (
              <Image
                src={src}
                alt={alt || ""}
                className="markdown-img"
                width={800}
                height={400}
                style={{ width: "auto", height: "auto" }}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default LivePreview;
