const SUPABASE_URL = "https://iizfsmtjjdisglvtolpj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpemZzbXRqamRpc2dsdnRvbHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MDQwMDksImV4cCI6MjA5NzE4MDAwOX0.LPn835L-0PBsLhMtdYghZ-Rkvh67WEOm8HwlbUsxRyw";

const db = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

document.getElementById("tanggal").value =
new Date().toISOString().split("T")[0];

async function simpanData() {

  const tanggal =
    document.getElementById("tanggal").value;

  const jenis =
    document.getElementById("jenis").value;

  const nominal =
    Number(
      document.getElementById("nominal").value
    );

  const keterangan =
    document.getElementById("keterangan").value;

  await db
    .from("transaksi")
    .insert([
      {
        tanggal,
        jenis,
        nominal,
        keterangan
      }
    ]);

  loadData();
}

async function loadData() {

  const { data } = await db
    .from("transaksi")
    .select("*")
    .order("id");

  let html = "";
  let saldo = 0;

  data.forEach(item => {

    if(item.jenis === "Pemasukan"){
      saldo += Number(item.nominal);
    } else {
      saldo -= Number(item.nominal);
    }

    html += `
      <tr>
        <td>${item.tanggal}</td>
        <td>${item.jenis}</td>
        <td>Rp ${Number(item.nominal).toLocaleString()}</td>
        <td>${item.keterangan}</td>
      </tr>
    `;
  });

  document.getElementById("hasil").innerHTML = html;

  document.getElementById("saldo").innerText =
    "Rp " + saldo.toLocaleString();
}

loadData();
