declare module "fast-xml-parser" {
  export type Options = {
    preserveOrder: boolean;
    attributeNamePrefix: string;
    attributesGroupName: boolean;
    textNodeName: string;
    ignoreAttributes: boolean;
    /** Remove NS from tag name or attribute name if true */
    removeNSPrefix: boolean;
    /** A tag can have attributes without any value */
    allowBooleanAttributes: boolean;
    parseTagValue: boolean;
    parseAttributeValue: boolean;
    /** Trim string values of tag and attributes */
    trimValues: boolean;
    cdataPropName: boolean;
    numberParseOptions: {
      hex: boolean;
      leadingZeros: boolean;
      eNotation: boolean;
    };
    tagValueProcessor: (tagName: string, val: string) => string;
    attributeValueProcessor: (attrName: string, val: string) => string;
    /** Nested tags will not be parsed even for errors */
    stopNodes: string[];
    alwaysCreateTextNode: boolean;
    isArray: () => boolean;
    commentPropName: boolean;
    unpairedTags: string[];
    processEntities: boolean;
    htmlEntities: boolean;
    ignoreDeclaration: boolean;
    ignorePiTags: boolean;
    transformTagName: boolean;
    transformAttributeName: boolean;
    updateTag: (tagName: string, jPath: string, attrs: string) => string;
  };

  export type ValidationOptions = {
    allowBooleanAttributes: boolean;
    unpairedTags: string[];
  };

  export declare class XMLParser {
    constructor(options?: Partial<Options>);

    /**
     * Parse XML data to JS object.
     *
     * @param xmlData
     * @param validationOptions If true, validates with default options.
     * Pass an object to define validation options.
     * Otherwise, validation is disabled.
     */
    parse(
      xmlData: string | Buffer,
      validationOptions?: boolean | Partial<ValidationOptions>,
    );

    /**
     * Add Entity which is not by default supported by this library.
     *
     * @param key
     * @param value
     */
    addEntity(key: string, value: string);
  }
}
