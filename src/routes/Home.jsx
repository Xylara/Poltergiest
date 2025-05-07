import styles from '../App.module.css';
import { A, useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { useSearchParams } from "@solidjs/router";

function Home() {
  const [inputValue, setInputValue] = createSignal("");
  const navigate = useNavigate();
  

  const handleSearch = () => {
    navigate(`/route?q=${btoa(inputValue())}`);
  };

  return (
    <div>
      <div class={styles.searchBar}>
        <img class={styles.searchBar_img} />
        <h1 class={styles.searchBar_header}>Poltergeist</h1>
        <input 
          id="conSub" 
          class={styles.searchBar_input} 
          value={inputValue()}
          onInput={(e) => setInputValue(e.target.value)} 
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      <div class={styles.settings}>
        <A href="/settings/" class="settings_listener">
          <img class={styles.settingsImgClickable} src="/settingsW.svg" />
        </A>
      </div>
    </div>
  );
}

export default Home;
