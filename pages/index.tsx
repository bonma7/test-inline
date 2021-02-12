import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'
import { InlineForm, InlineText } from 'react-tinacms-inline'
import { usePlugin } from 'tinacms'
import { GetStaticProps } from 'next'

export default function Home({ file, preview }) {
  const formOptions = {
    label: 'Home Page',
    fields: [{ name: 'title', component: 'text' }],
  }

  /*
   ** Register a JSON Tina Form
   */
  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  useGithubToolbarPlugins()

  return (
    <InlineForm form={form}>
      <main>
       <h1>
         <InlineText name="title" />
       </h1>
      </main>
    </InlineForm>
  )
}

/*
 ** Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  }
}