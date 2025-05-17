import React from "react";

interface ReactElementWithProps extends React.ReactElement {
  props: {
    children?: React.ReactNode;
    [key: string]: any;
  };
  type: any;
}

const formatContent = (content: React.ReactNode): string => {
  if (typeof content === "string") {
    return content;
  }
  if (typeof content === "number" || typeof content === "boolean") {
    return content.toString();
  }
  if (!content) {
    return "";
  }
  if (React.isValidElement(content)) {
    const element = content as ReactElementWithProps;

    if (element.type === "code") {
      return React.Children.toArray(element.props.children)
        .map((child) => formatContent(child))
        .join("");
    }
    if (element.type === "table") {
      let tableHTML = "<table>\n";
      React.Children.forEach(element.props.children, (child: any) => {
        if (child.type === "thead" || child.type === "tbody") {
          React.Children.forEach(child.props.children, (row: any) => {
            if (row.type === "tr") {
              tableHTML += "  <tr>\n";
              React.Children.forEach(row.props.children, (cell: any) => {
                if (cell.type === "th") {
                  tableHTML += `    <th>${formatContent(
                    cell.props.children
                  )}</th>\n`;
                } else if (cell.type === "td") {
                  tableHTML += `    <td>${formatContent(
                    cell.props.children
                  )}</td>\n`;
                }
              });
              tableHTML += "  </tr>\n";
            }
          });
        }
      });
      tableHTML += "</table>";
      return tableHTML;
    }
    return React.Children.toArray(element.props.children)
      .map((child) => formatContent(child))
      .join("");
  }
  if (Array.isArray(content)) {
    return content.map((child) => formatContent(child)).join("");
  }
  return "";
};

export { formatContent };
