# electron-note-app

# özellikleri:
veri ekleme: ekleme işlemi bittikten sonra toast mesajı ile bilgilendirme
veri silme: silme işlemeinde confirm mesaj ile sorulması
veri güncelleme
verileri listeleme: data-table ile verilerin listelenmesi
her crud işlemlerden sonra listenin güncellenmesi
verileri girdikten sonra iptal deyince değişiklikler kaybolacak diye confirm mesaj verilmesi

# kullanılan kütüphaneler:
vuetify
vue
ramda
date-fns
pug

## Quick Setup

```sh
# clone the project
git clone https://github.com/selcukari/NoteApplicationElectronVue.git

# enter the project directory
cd NoteApplicationElectronVue

# install dependency
npm install

# develop
npm run dev
```

## Directory

```diff
+ ├─┬ electron
+ │ ├─┬ main
+ │ │ └── index.ts    entry of Electron-Main
+ │ └─┬ preload
+ │   └── index.ts    entry of Preload-Scripts
  ├─┬ src
  │ └── main.ts       entry of Electron-Renderer
  ├── index.html
  ├── package.json
  └── vite.config.ts
```