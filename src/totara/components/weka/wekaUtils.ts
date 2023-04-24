/**
 * This file is part of Totara Enterprise.
 *
 * Copyright (C) 2020 onwards Totara Learning Solutions LTD
 *
 * Totara Enterprise is provided only to Totara Learning Solutions
 * LTD’s customers and partners, pursuant to the terms and
 * conditions of a separate agreement with Totara Learning
 * Solutions LTD or its affiliate.
 *
 * If you do not have an agreement with Totara Learning Solutions
 * LTD, you may not access, use, modify, or distribute this software.
 * Please contact [sales@totaralearning.com] for more information.
 */

import { NAVIGATION } from "@totara/lib/navigation";
import { MAX_LIST_ITEM_LEVELS, WekaEditorType } from "./constants";

const { WEBVIEW_ACTIVITY } = NAVIGATION;

interface Visitor<T> {
  visitWekaRoot(element: WekaRoot): T;
  visitWekaParagraph(element: WekaParagraph): T;
  visitWekaList(element: WekaList): T;
  visitWekaBulletList(element: WekaBulletList): T;
  visitWekaOrderList(element: WekaOrderList): T;
  visitWekaEmoji(element: WekaEmoji): T;
  visitHeader(element: WekaHeading): T;
  visitWekaImage(element: WekaImage): T;
  visitWekaText(element: WekaText): T;
  visitWekaLinkMedia(element: WekaLinkMedia): T;
  visitWekaAttachment(element: WekaAttachment): T;
  visitWekaRuler(element: WekaRuler): T;
  visitWekaVideo(element: WekaVideo): T;
}
interface Node<T> {
  accept(v: Visitor<T>): T;
  content?: Node<T>[];
}

class WekaNode implements Node<Object> {
  content: Node<Object>[];
  constructor(content: Node<Object>[]) {
    this.content = content;
  }
  accept(v: Visitor<Element>): Element {
    return v;
  }
}

class WekaLinkMedia implements Node<Object> {
  attrs: any;
  constructor(attrs) {
    this.attrs = attrs;
  }
  accept(v: Visitor<Element>): Element {
    return v.visitWekaLinkMedia!(this);
  }
}

class WekaRoot extends WekaNode {
  accept(v: Visitor<Object>): Object {
    return v.visitWekaRoot(this);
  }
}

class WekaParagraph extends WekaNode {
  accept(v: Visitor<Element>): Element {
    return v.visitWekaParagraph(this);
  }
}

class WekaBulletList extends WekaNode {
  accept(v: Visitor<Element>): Element {
    return v.visitWekaBulletList(this);
  }
}

class WekaOrderList extends WekaNode {
  accept(v: Visitor<Element>): Element {
    return v.visitWekaOrderList(this);
  }
}

class WekaHeading extends WekaNode {
  accept(v: Visitor<Element>): Element {
    return v.visitHeader(this);
  }
}

class WekaList extends WekaNode {
  accept(v: Visitor<Element>): Element {
    return v.visitWekaList(this);
  }
}

class WekaEmoji implements Node<Object> {
  shortCode: string;
  constructor(shortcode) {
    this.shortCode = shortcode;
  }
  accept(v: Visitor<Object>): Object {
    return v.visitWekaEmoji(this);
  }
}

class WekaAttachment extends WekaNode {
  accept(v: Visitor<Element>): Element {
    return v.visitWekaAttachment(this);
  }
}

class WekaVideo extends WekaNode {
  accept(v: Visitor<Element>): Element {
    return v.visitWekaVideo(this);
  }
}

class WekaRuler extends WekaNode {
  accept(v: Visitor<Element>): Element {
    return v.visitWekaRuler(this);
  }
}

class WekaText implements Node<Object> {
  text: string;
  attrs: any;
  marks: any;
  constructor(text, attrs, marks) {
    this.text = text;
    this.attrs = attrs;
    this.marks = marks;
  }
  accept(v: Visitor<Object>): Object {
    return v.visitWekaText(this);
  }
}

class WekaImage implements Node<Object> {
  url: string;
  fileName: string;
  constructor(url, fileName) {
    this.url = url;
    this.fileName = fileName;
  }
  accept(v: Visitor<Object>): Object {
    return v.visitWekaImage(this);
  }
}

const mapTypeToNode = {
  [WekaEditorType.paragraph]: (content, level) => {
    return new WekaParagraph(jsonObjectToWekaNodes(content, level));
  },

  [WekaEditorType.bulletList]: (content, level) => {
    return new WekaBulletList(jsonObjectToWekaNodes(content, level));
  },

  [WekaEditorType.orderedList]: (content, level) => {
    return new WekaOrderList(jsonObjectToWekaNodes(content, level));
  },

  [WekaEditorType.listItem]: (content, level) => {
    return new WekaList(jsonObjectToWekaNodes(content, level));
  },

  [WekaEditorType.image]: (item) => {
    return new WekaImage(item.url, item.fileName);
  },

  [WekaEditorType.emoji]: (shortcode) => {
    return new WekaEmoji(shortcode);
  },

  [WekaEditorType.text]: (item) => {
    return new WekaText(item.text, item.type, item.marks);
  },

  [WekaEditorType.heading]: (content, level) => {
    return new WekaHeading(jsonObjectToWekaNodes(content, level));
  },
  [WekaEditorType.linkMedia]: (content) => {
    return new WekaLinkMedia(content);
  },
  [WekaEditorType.attachment]: (content) => {
    return new WekaAttachment(content);
  },
  [WekaEditorType.video]: (content) => {
    return new WekaVideo(content);
  },
  [WekaEditorType.ruler]: (content) => {
    return new WekaRuler(content);
  }
};

const jsonObjectToWekaNodes = (data: any, level = 1): Node<Object>[] => {
  if (data) {
    const dataArray = Array.isArray(data.content) ? data.content : data;
    if (Array.isArray(dataArray)) {
      return (
        dataArray &&
        dataArray.map((item: any) => {
          const { type, content, attrs } = item;

          if (type === WekaEditorType.text) {
            return mapTypeToNode[type](item, attrs);
          }

          if (type === WekaEditorType.paragraph) {
            return mapTypeToNode[type](item, level);
          }

          if (type === WekaEditorType.emoji) {
            return mapTypeToNode[type](attrs.shortcode);
          }
          if (type === WekaEditorType.image || type === WekaEditorType.linkMedia || type === WekaEditorType.video) {
            return mapTypeToNode[type](attrs);
          }
          if (type === WekaEditorType.bulletList || type === WekaEditorType.orderedList) {
            if (level <= MAX_LIST_ITEM_LEVELS) {
              return mapTypeToNode[type](item, level + 1);
            }
            return null;
          }

          if (type === WekaEditorType.ruler) {
            return mapTypeToNode[type](item);
          }
          return content && mapTypeToNode[type] ? mapTypeToNode[type](content, level) : null;
        })
      );
    }
  }
  return [];
};

const wrappedWekaNodes = (nodes: Node<Object>[]): WekaRoot => {
  const res = new WekaRoot(nodes);
  return res;
};

type ConfigProps = {
  content?: any;
  index?: number;
  attrs?: any;
  children?: (index: number) => void;
  textColor?: string;
};

type EmbeddedMediaProps = {
  content: any;
  title: string;
};

const navigateWebView = ({
  url,
  onRequestClose = () => undefined,
  title,
  apiKey,
  navigation
}: {
  url?: string;
  title?: string;
  onRequestClose?: Function;
  apiKey?: string;
  navigation: any;
}) => {
  const props = {
    uri: url?.replace("totara/mobile/", ""), // This is the temp solution for webview headers error fix
    apiKey,
    backAction: onRequestClose,
    title: title
  };

  if (url) {
    navigation.navigate(WEBVIEW_ACTIVITY, {
      screen: WEBVIEW_ACTIVITY,
      params: {
        ...props
      }
    });
  }
};

// Disable eslint for interface so we can export without warnings.
export {
  // eslint-disable-next-line no-undef
  Visitor,
  // eslint-disable-next-line no-undef
  Node,
  wrappedWekaNodes,
  jsonObjectToWekaNodes,
  WekaRoot,
  WekaParagraph,
  WekaText,
  WekaList,
  WekaEmoji,
  WekaOrderList,
  WekaBulletList,
  WekaHeading,
  WekaImage,
  navigateWebView,
  WekaLinkMedia,
  // eslint-disable-next-line no-undef
  ConfigProps,
  // eslint-disable-next-line no-undef
  EmbeddedMediaProps,
  WekaAttachment,
  WekaRuler,
  WekaVideo
};
