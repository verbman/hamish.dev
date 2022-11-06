import Document, { DocumentContext, DocumentInitialProps } from 'next/document'
import { Html, Head, Main, NextScript } from 'next/document'
import { getCookie } from 'cookies-next';

type SiteDocumentInitialProps = DocumentInitialProps & {
  mode?: string;
};

class MyDocument extends Document<SiteDocumentInitialProps> {

  static async getInitialProps(ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    let result = initialProps as SiteDocumentInitialProps;
    result.mode = 'light';

    const cookie = getCookie('reader', ctx)
    if (cookie) {
      const reader = JSON.parse(cookie as string);
      if (reader.mode) {
        result.mode = reader.mode;
      }
    }
    return result
  }

  render() {
    return (
      <Html>
        <Head />
        <body className={this.props.mode}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
