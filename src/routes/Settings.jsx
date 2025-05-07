import { createSignal } from 'solid-js';
import styles from '../Settings.module.css';
import global from '../Global.module.css';
import { A } from "@solidjs/router";

function Settings() {
    const [sbcon, setsbCon] = createSignal('');

    // all of the settings signals
    const [pBackend, setPBackend] = createSignal(localStorage.getItem('pBackend') || 'Uv');
    const [server, setServer] = createSignal(localStorage.getItem('server') || 'local');
    const [cookiesEnabled, setCookiesEnabled] = createSignal(localStorage.getItem('cookiesEnabled') === 'true');
    const [jsEnabled, setJsEnabled] = createSignal(localStorage.getItem('jsEnabled') === 'true');

    const savePBackend = (e) => {
        setPBackend(e.target.value);
        localStorage.setItem('pBackend', e.target.value);
    };

    const saveServer = (e) => {
        setServer(e.target.value);
        localStorage.setItem('server', e.target.value);
    };

    const saveCookiesEnabled = (e) => {
        setCookiesEnabled(e.target.checked);
        localStorage.setItem('cookiesEnabled', e.target.checked);
    };

    const saveJsEnabled = (e) => {
        setJsEnabled(e.target.checked);
        localStorage.setItem('jsEnabled', e.target.checked);
    };

    const openCon = () => setsbCon(
        <div id="con" class={global.settingsList}>
            <div id="backendSettings">
                <h2>Backend Settings</h2>
                <select value={pBackend()} onChange={savePBackend}>
                    <option value="Uv">Ultraviolet</option>
                    <option value="Scram">Scramjet</option>
                </select>
            </div>
            <div id="wispServer">
                <h2>Wisp settings</h2>
                <select value={server()} onChange={saveServer}>
                    <option value="local">Default server</option>
                    <option value="anura">Anura (wss://anura.pro)</option>
                </select>
            </div>
        </div>
    );

    const openPrivacy = () => setsbCon(
        <div id="priv" class={global.settingsList}>
            <div id="cookiesEnabled">
                <h2> <input 
                        type="checkbox" 
                        checked={cookiesEnabled()} 
                        onChange={saveCookiesEnabled} 
                    /> Don't store cookies </h2>
            </div>
            <div id="jsEnabled"> 
                <h2> <input 
                        type="checkbox" 
                        checked={jsEnabled()} 
                        onChange={saveJsEnabled} 
                    /> Disable Javascript </h2>
            </div>
        </div>
    );

    {openCon()}
    return (
        <div>
            <div class={styles.Navbar}>
                <A href="/"><img src="/back.svg" style="width: 2vw; height: 2vw; fill: white; margin-top: 5vh; margin-right: 15vw;"></img></A>
                <div class={styles.Navbar_general}>
                    <button class={styles.Navbar_btn} onClick={openCon}>Connection</button>
                </div>
                <div class={styles.Navbar_general}>
                    <button class={styles.Navbar_btn} onClick={openPrivacy}>Privacy</button>
                </div>
            </div>
            <div class={styles.settingsBody} id="sbody">
                {sbcon()} 
            </div>
        </div>
    );
}

export default Settings;
