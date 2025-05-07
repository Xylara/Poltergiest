import { createEffect } from "solid-js"
import { useSearchParams } from "@solidjs/router"
import styles from "../Route.module.css"
export default function URoute() {
  const [searchParams] = useSearchParams()

  const httpsRegex = /^https:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/.*)?$/
  const siteRegex = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/.*)?$/

  let iframe

  createEffect(() => {
    const encoded = searchParams.q
    const inpt = atob(encoded)

    if (httpsRegex.test(inpt)) {
      iframe.src = __uv$config.prefix + __uv$config.encodeUrl(inpt)
      console.log("choosing http")
    } else if (siteRegex.test(inpt)) {
      iframe.src = __uv$config.prefix + __uv$config.encodeUrl("https://" + inpt)
      console.log("choosing reg")
    } else {
      // todo - switcher for the stuff with the things
      const url = "https://duckduckgo.com/?t=h_&q=" + inpt
      iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url)
      console.log("choosing search")
    }
  })

  return <iframe id="uframe" ref={el => (iframe = el)} class={styles.frame} />
}
