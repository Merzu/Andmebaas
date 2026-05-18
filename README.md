# PersonalDB 🗄️

> Isiklik andmebaas — kõik ühes kohas. GitHub Pages'il, sisselogimisega.

## ✨ Funktsioonid

### 🔐 Autentimine
- Kasutajanimi + parool sisselogimine
- Sessioonipõhine (sulge brauser = logi välja)
- Parool räsitakse (lihtne hash)

### 📝 Sektsioonid
| Sektsioon | Kirjeldus |
|-----------|-----------|
| **Dashboard** | Ülevaade kõigest, statistika, lähenevad tähtajad |
| **Märkmed** | Märkmed siltidega, otsing |
| **Käsud & Skriptid** | IT käsud kategooriate järgi, üheklõps kopeerimine |
| **Paroolid** | Paroolihalur URL ja märkustega |
| **Võrgu Info** | IP, MAC, subnet, gateway, DNS jms |
| **Projektid** | Projektid staatuse, stacki, GitHub lingiga |
| **Tööriistad** | Kiirlingid tööriistadele |
| **Ained** | Kooliained õpetaja ja materjalidega |
| **Kodutööd** | Tähtajad, prioriteet, märkeruut |
| **Hinded** | Hinded keskmise arvutusega |
| **Galerii** | Piltide galerii albumite järgi, lightbox |
| **Kontaktid** | Kontaktide andmebaas |
| **Rahandus** | Tulu/kulu arvestus kokkuvõttega |
| **Üldinfo** | Kõik muu oluline info |
| **Lingid** | Olulised veebiaadressid |
| **Seaded** | Teema, parool, andmete haldus |

### ⌨️ Kiirklahvid
- `Ctrl+K` — globaalne otsing
- `Ctrl+N` — uus märkus
- `Esc` — sulge modal / lightbox

### 💾 Andmed
- Kõik andmed salvestatakse **localStorage**-i (kohalikult)
- **Eksport**: JSON fail varundamiseks
- **Import**: taasta varukopiast

---

## 🚀 GitHub Pages'ile ülespanek

### 1. Loo GitHub repo
```bash
git init
git add .
git commit -m "feat: PersonalDB v2.0"
git branch -M main
git remote add origin https://github.com/SINU_KASUTAJA/personaldb.git
git push -u origin main
```

### 2. Luba GitHub Pages
1. Mine repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` → `/ (root)`
4. Klõpsa **Save**
5. Oota ~2 minutit → sait on saadaval: `https://SINU_KASUTAJA.github.io/personaldb/`

### 3. Esimene sisselogimine
1. Ava sait
2. Klõpsa **"Esimene kord? Seadista konto"**
3. Loo oma kasutajanimi ja parool
4. Ongi valmis!

---

## 📁 Struktuur
```
personaldb/
├── index.html       # Sisselogimisleht
├── app.html         # Peamine rakendus
├── css/
│   ├── style.css    # Globaalsed stiilid + login
│   └── app.css      # Rakenduse stiilid
└── js/
    ├── auth.js      # Autentimine
    ├── db.js        # Andmebaas (localStorage)
    ├── ui.js        # UI utiliidid
    ├── sections.js  # Sektsioonide renderdamine
    ├── modals.js    # Modaalvormid
    └── app.js       # Peamine init
```

---

## 🔒 Turvalisus

> ⚠️ See on **isiklik** rakendus. Ei soovitata tundlikke andmeid (nt pärisparoolid) hoida, kuna:
> - Andmed on krüpteerimata localStorage-s
> - GitHub repo on avalik (kui ei kasuta private repo-t)

**Soovitused:**
- Kasuta **private** GitHub repo-t
- Ära salvesta reaalseid paroole — kasuta paroolihaldurit (Bitwarden, KeePass)
- Tee regulaarselt JSON eksport varundamiseks

---

## 🎨 Teemad
- **Tume** (vaikimisi) — must taust, roheline accent
- **Hele** — hele taust
- **Cyber** — täisturvaline küberturvalisuse esteetika

---

## 📊 Andmete haldamine

### Eksport (varundamine)
Topbar → **↓ Eksport** → salvestab `personaldb_backup_YYYY-MM-DD.json`

### Import (taastamine)
Topbar → **↑ Import** → vali JSON fail

### Kustutamine
Seaded → Kustuta kõik andmed

---

*PersonalDB v2.0 — Ehitatud personalse kasutuse jaoks* 🚀
