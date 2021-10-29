import { Component } from "@angular/core";

@Component ({
  selector: 'app-szervezet-bizottsagok',
  templateUrl: './szervezet-bizottsagok.component.html',
  styleUrls: ['./szervezet-bizottsagok.component.css']
})
export class SzervezetBizottsagokComponent {
  committeesObject = [
  {
    name: 'Ellenőrző Bizottság',
    brief: 'Szervezetünk őrszeme, az Ellenőrző Bizottság azért felel, hogy a Hallgatói Önkormányzat működése minden szabályozásnak megfelelően működjön, legyen az az Alapszabály, a Hallgatói Követelményrendszer vagy a Nemzeti Felsőoktatási Törvény. Felelnek a jegyzőkönyvek elkészüléséért, azok ellenőrzéséért, illetve üléseink megfelelő lebonyolításának biztosításáért. Bár elsődlegesen háttérfeladatokkal foglalkoznak, szervezetünk számára egy kritikusan fontos felelősséggel rendelkeznek a hallgatói érdekképviselet hibátlan lefolyása érdekében.',
    members: [
      {
        name: 'Mecséri Eszter Ágnes',
        position: 'Ellenőrző Bizottság elnöke',
        contact: 'eb@ikhok.elte.hu'
      },
      {
        name: 'Bucsánszki Tamás Mihály',
        position: 'Ellenőrző Bizottság tagja',
        contact: 'eb@ikhok.elte.hu'
      },
      {
        name: 'Franta Áron',
        position: 'Ellenőrző Bizottság tagja',
        contact: 'eb@ikhok.elte.hu'
      }
    ]
  },
  {
    name: 'Hallgatói Jóléti Bizottság',
    brief: 'A Hallgatói Jóléti Bizottság a Kar ösztöndíjainak motorja. A kondibérletek utáni visszatérítéstől kezdve a bonyolult szociális támogatásokig minden kifizetést ellenőriz és bírál. Felelőssége hatalmas, hiszen sokak megélhetősége függ tőle, így tagjainak felkészültnek, és profinak kell lenniük, annak ellenére, hogy valamennyien előképzettség nélküli, mezei egyetemisták. Ha jön a pályázási időszak, felberreg a motor, és éjt-nappallá téve dolgozik a Bizottság, hogy minden pályázat gyorsan, de ami még fontosabb, pontosan legyen véleményezve.',
    members: [
      {
        name: 'Bognár Viktória',
        position: 'Hallgatói Jóléti Bizottság elnöke',
        contact: 'osztondij@ikhok.elte.hu'
      },
      {
        name: 'Ács Máté Olivér',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Agg Martin',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Deák Dalma',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Ilea Patrik',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Lajkó Míra',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Milos Alex',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Nagy Gergő',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Szucsányi István',
        position: 'Tag',
        contact: ''
      }
    ]
  },
  {
    name: 'Kommunikációs Bizottság',
    brief: 'Ezek a sorok, ez a honlap, és a legtöbb publikus információ egy forrásból árad - a Kommunikációs Bizottságból. Amellett, hogy felel az Önkormányzat megjelenéséért, a Bizottság biztosítja, hogy minden fontos információ eljusson hozzád, legyen ez e-mail, Facebook bejegyzés, vagy akár videó formájában. Az év közben folyton kapcsolatot tart az összes bizottsággal, hogy bármilyen változást, lehetőséget, hivatalos ügyet a lehető leggyorsabban publikálhasson. Emellett nyári munkája is kiemelten fontos, hiszen a friss elsőéveseknek mindenről tudniuk kell, és csak akkor lesz sikeres a gólyák integrációja, ha nem vesznek el az új, ijesztő egyetemi rendszer világában.',
    members: [
      {
        name: 'Kassai Gréta',
        position: 'Kommunikációs Bizottság elnöke',
        contact: 'kommunikacio@ikhok.elte.hu'
      },
      {
        name: 'Balázs Kristóf',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Bujáki Patrik',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Dobi Viktor',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Fodor Zoltán',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Horváth Boglárka Brigitta',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Hosek Henrietta',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Nagy Bendegúz',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Szűcs József Nándor',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Szucsányi István',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Vikor Bogdán Vitold',
        position: 'Tag',
        contact: ''
      }
    ]
  },
  {
    name: 'Külügyi Bizottság',
    brief: 'Ha sétálsz a folyosón, beülsz a büfébe, vagy a B épületben barnulsz a napon, elkerülhetetlenül meg fogják csapni a füledet idegen szavak, mondatok. A Kar büszke lehet arra, hogy mennyi hallgató érkezik ide mobilitási programokkal, de a sok külföldi sok felelősséggel is jár. A Külügyi Bizottság felelőssége, hogy a számtalan ideérkező ne csak az egyetemi tanulmányokban, de a magyar bürokráciában, a 4-es 6-os tömegében és a kari közéletben is sikeresen vegye az akadályokat. Viszont, ha van, aki beérkezik, lesz olyan is, aki kimegy. A külügyesek feladata, hogy összeszedjék az információkat a lehetőségekről, amik rád várnak, ha egy-két félévet külföldön töltenél.',
    members: [
      {
        name: 'Mészáros Gábor',
        position: 'Külügyi Bizottság elnöke',
        contact: 'kulugy@ikhok.elte.hu'
      },
      {
        name: 'Árva Lúcia Borbála',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Farkas Balázs',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Gerely Viktor András',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Tóth Lilla Boróka',
        position: 'Tag',
        contact: ''
      }
    ]
  },
  {
    name: 'Szervező Bizottság',
    brief: 'Voltál már TSzH-n? SzEM-en? Valamilyen kari buliban? Nem meglepő, hogy ezek mindegyikét a Szervező Bizottság… nos… szervezi. A programokat hosszas készülődés előzi meg, biztosítva ezzel, hogy az események akadályok nélkül folyhassanak. Az év közbeni rendezvényeken felül minden évben nyár végén - ősz elején óriási feladat áll a bizottság előtt, hiszen megérkeznek az elsőévesek, akiknek biztosítani kell az olyan programokat, mint a gólyahét, programozóavató, vagy a gólyabál - ez utóbbi kiemelendő, hiszen több karnak kell közösen dolgozni azon, hogy minden gólya átélhesse az első egyetemi bálját, legyen az egy retro gatsby, winter wonderland, vagy középkori bál.',
    members: [
      {
        name: 'Fodor Zoltán',
        position: 'Szervező Bizottság elnöke',
        contact: 'rendezveny@ikhok.elte.hu'
      },
      {
        name: 'Nincs kedvem kitölteni',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Nincs kedvem kitölteni',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Nincs kedvem kitölteni',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Nincs kedvem kitölteni',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Nincs kedvem kitölteni',
        position: 'Tag',
        contact: ''
      },
    ]
  },
  {
    name: 'Tanulmányi Bizottság',
    brief: 'Hallgatók, oktatók, felsővezetés. Rengeteg a szereplő a Kar tanulmányi életében, és a hallgatói érdekeket mindenhova el kell juttatni. Ha változik a tanterv, módosul a képzés, változnak az oktatók, vagy épp probléma van valamelyikükkel, a Tanulmányi Bizottságnak ott kell lennie. De nem áll meg itt a felelőssége, hiszen a nyílt napokat és az Educatio standot is a bizottság intézi, így hatalmas szerepet vállal a felvételizők bevonzásában. És mit csinál a bizottság évkezdéskor? Integrál, noha nem folytonos függvényeket, hanem gólyákat. A tanulmányi mentorrendszer az IK egyik büszkesége lehet, mert a felkészült mentorok minden friss hallgató mellett ott állnak, mint egyetemi gondviselő, megkönnyítve ezzel az első lépéseiket az új világban.',
    members: [
      {
        name: 'Lajkó Míra',
        position: 'Tanulmányi Bizottság elnöke',
        contact: 'tanulmany@ikhok.elte.hu'
      },
      {
        name: 'Nincs kedvem kitölteni',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Nincs kedvem kitölteni',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Nincs kedvem kitölteni',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Nincs kedvem kitölteni',
        position: 'Tag',
        contact: ''
      },
      {
        name: 'Nincs kedvem kitölteni',
        position: 'Tag',
        contact: ''
      },
    ]
  },
  {
    name: 'Választási Bizottság Bizottság',
    brief: '',
    members: [
      {
        name: 'Feigl Erik',
        position: 'Választási Bizottság elnöke',
        contact: 'vb@ikhok.elte.hu'
      },
      {
        name: 'Demeter Attila Árpád',
        position: 'Választási Bizottság tagja',
        contact: 'vb@ikhok.elte.hu'
      },
      {
        name: 'Magyar Dorina',
        position: 'Választási Bizottság tagja',
        contact: 'vb@ikhok.elte.hu'
      }
    ]
  }];
}
