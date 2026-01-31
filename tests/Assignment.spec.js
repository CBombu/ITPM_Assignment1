const { test, expect } = require("@playwright/test");

const cases = [
  { id: "Pos_Fun_0001", input: "mama heta udheama giyaata anidhdha thamaa tharage thiyenne", expected: "මම හෙට උදේම ගියාට අනිද්ද තමා තරගෙ තියෙන්නෙ" },
  { id: "Pos_Fun_0002", input: "mama yaaluvaa balanna yanavaa. Oyath enavaadha?", expected: "මම යාලුවා බලන්න යනවා. ඔයත් එනවාද?" },
  { id: "Pos_Fun_0003", input: "aeyi mama kathaa karaama aavea naththe?", expected: "ඇයි මම කතා කරාම ආවේ නත්තෙ?" },
  { id: "Pos_Fun_0004", input: "sadhdhen sindhuvak kiyanna", expected: "සද්දෙන් සින්දුවක් කියන්න" },
  { id: "Pos_Fun_0005", input: "bus ekeadhi magee wallet eka vaetilaa ID ekayi bank card ekayi okkoma naethi unaa", expected: "bus එකේදි මගේ wallet එක වැටිලා ID එකයි bank card එකයි ඔක්කොම නැති උනා" },
  { id: "Pos_Fun_0006", input: "eya ikmanata vaedea karala dheyidha?", expected: "එය ඉක්මනට වැඩේ කරල දෙයිද?" },
  { id: "Pos_Fun_0007", input: "eyaala adha party ekakata yanavaa", expected: "එයාල අද party එකකට යනවා" },
  { id: "Pos_Fun_0008", input: "mama iiye paadam karaa", expected: "මම ඊයෙ පාඩම් කරා" },
  { id: "Pos_Fun_0009", input: "mama aluthen gaththa sapaththu dheka rs. 7000k unaa", expected: "මම අලුතෙන් ගත්ත සපත්තු දෙක rs. 7000ක් උනා" },
  { id: "Pos_Fun_0010", input: "api heta trip ekak yanavaa", expected: "අපි හෙට trip එකක් යනවා" },
  { id: "Pos_Fun_0011", input: "mama dhaen gedhara yana gaman inne", expected: "මම දැන් ගෙදර යන ගමන් ඉන්නේ" },
  { id: "Pos_Fun_0012", input: "mata udhavu karanna venne naehae", expected: "මට උදවු කරන්න වෙන්නෙ නැහැ" },
  { id: "Pos_Fun_0013", input: "mama chithrayak aDHinavaa", expected: "මම චිත්‍රයක් අඳිනවා" },
  { id: "Pos_Fun_0014", input: "gaalla kiyanne ithihasayath sobaadhahamath ekata ekathu vuu lassana nagarayak. gaalu kotuvea, parana biththi saha patu maavath baladhdhi athiithayata giyaa vagee haeGiimak dhaenenavaa", expected: "ගාල්ල කියන්නෙ ඉතිහසයත් සොබාදහමත් එකට එකතු වූ ලස්සන නගරයක්. ගාලු කොටුවේ, පරන බිත්ති සහ පටු මාවත් බලද්දි අතීතයට ගියා වගේ හැඟීමක් දැනෙනවා" },
  { id: "Pos_Fun_0015", input: "bus eka miss una nisaa mama veegen veegen dhuvagena aavaa", expected: "bus එක miss උන නිසා මම වේගෙන් වේගෙන් දුවගෙන ආවා" },
  { id: "Pos_Fun_0016", input: "mama heta kathaa karannadha? Magea assignment eka delete una nisaa mama dhaen aayeth eeka karana gaman inne", expected: "මම හෙට කතා කරන්නද? මගේ assignment එක delete උන නිසා මම දැන් ආයෙත් ඒක කරන ගමන් ඉන්නේ" },
  { id: "Pos_Fun_0017", input: "kunaatu nisaa light kanu damage velaa", expected: "කුනාටු නිසා light කනු damage වෙලා" },
  { id: "Pos_Fun_0018", input: "10ta ganan karanna kalin ikmanata dhuvaapan", expected: "10ට ගනන් කරන්න කලින් ඉක්මනට දුවාපන්" },
  { id: "Pos_Fun_0019", input: "magea athe salli naehae", expected: "මගේ අතෙ සල්ලි නැහැ" },
  { id: "Pos_Fun_0020", input: "Suba sandhYAavak veavaa", expected: "සුබ සන්ද්‍යාවක් වේවා" },
  { id: "Pos_Fun_0021", input: "pavathina dhaedi varshaapathanaya nisaa nives thulama raeDHii sitina lesata rajayen kaarunika dhaenum dhiimak", expected: "පවතින දැඩි වර්ශාපතනය නිසා නිවෙස් තුලම රැඳී සිටින ලෙසට රජයෙන් කාරුනික දැනුම් දීමක්" },
  { id: "Pos_Fun_0022", input: "oyaage potha mata tikakata dhenna puluvandha?", expected: "ඔයාගෙ පොත මට ටිකකට දෙන්න පුලුවන්ද?" },
  { id: "Pos_Fun_0023", input: "mama eliyata yanavaa", expected: "මම එලියට යනවා" },
  { id: "Pos_Fun_0024", input: "ammaatasiri, methana thibba paeena kavuruhari ussalaa", expected: "අම්මාටසිරි, මෙතන තිබ්බ පෑන කවුරුහරි උස්සලා" },
  { id: "Neg_Fun_0001", input: "mageballabolepassendiwuwa", expected: "මගේ බල්ල බෝලෙ පස්සෙන් දිවුවා" },
  { id: "Neg_Fun_0002", input: "courseweb eke link eka https://courseweb.sliit.lk/", expected: "courseweb එකේ link එක https://courseweb.sliit.lk/" },
  { id: "Neg_Fun_0003", input: "'this is my bag'aeya paevasuvaaya", expected: "'තිස් ඉස් my bag' ඇය පැවසුවාය" },
  { id: "Neg_Fun_0004", input: "mama code karanna php paavichchi karanavaa", expected: "මම code කරන්න php පාවිච්චි කරනවා" },
  { id: "Neg_Fun_0005", input: "mama pramodya", expected: "මම ප්‍රමෝද්‍ය" },
  { id: "Neg_Fun_0006", input: "mama dhaen balanne part ii", expected: "මම දැන් බලන්නෙ part (ii)" },
  { id: "Neg_Fun_0007", input: "api Negambo beach ekata giyaa", expected: "අපි Negambo beach එකට ගියා" },
  { id: "Neg_Fun_0008", input: "hi magee nama sahan", expected: "hi මගේ නම සහන්" },
  { id: "Neg_Fun_0009", input: "F = ma valin force eka hoyanne", expected: "F = ma වලින් force එක හොයන්නෙ" },
  { id: "Neg_Fun_0010", input: "sri lankaa maathaa ", expected: "ශ්‍රී ලංකා මාතා" }
];

test.describe("SwiftTranslator - Positive functional tests", () => {
  for (const tc of cases) {
    test(`${tc.id}`, async ({ page }) => {
      await page.goto("https://www.swifttranslator.com/");
      const inputBox = page.getByRole("textbox", {
        name: "Input Your Singlish Text Here.",
      });
      await inputBox.fill(tc.input);
      await expect(page.getByText(tc.expected)).toBeVisible();
    });
  }
});
