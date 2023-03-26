#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri_plugin_sql::TauriSql;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn password() -> String {
    format!("123654")
}

fn main() {
    tauri::Builder::default()
        .plugin(TauriSql::default())
        .invoke_handler(tauri::generate_handler![greet,password])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
