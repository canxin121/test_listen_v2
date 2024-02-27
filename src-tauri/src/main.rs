// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::str::FromStr;

use tauri::{generate_handler, webview::Url, Manager, Runtime, WebviewWindowBuilder};

#[tauri::command]
async fn emit<R: Runtime>(
    app: tauri::AppHandle<R>,
    _window: tauri::Window<R>,
    label: String,
) -> Result<(), String> {
    app.emit(&label, "msg").unwrap();
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
fn main() {
    tauri::Builder::default()
        .invoke_handler(generate_handler![emit])
        .setup(|app| {
            let builder = WebviewWindowBuilder::new(
                app,
                "second",
                tauri::WebviewUrl::CustomProtocol(Url::from_str("http://localhost:1420").unwrap()),
            );
            let _webview = builder.title("Tauri - second").build()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
