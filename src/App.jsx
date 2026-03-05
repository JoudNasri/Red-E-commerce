import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════
   COLORS & THEME
═══════════════════════════════════════ */
const C = {
  black:   "#080608",
  deep:    "#0f0a0f",
  card:    "#130e14",
  red:     "#e8001a",
  crimson: "#b0001a",
  gold:    "#c9a84c",
  goldLight:"#e8c97a",
  white:   "#f5f0f0",
  gray:    "rgba(245,240,240,0.55)",
  faint:   "rgba(245,240,240,0.25)",
  border:  "rgba(232,0,26,0.18)",
  glow:    "rgba(232,0,26,0.3)",
  goldGlow:"rgba(201,168,76,0.3)",
};

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const CATEGORIES = [
  { id:"all",     label:"All",        labelAr:"الكل" },
  { id:"women",   label:"Women",      labelAr:"نساء" },
  { id:"kids",    label:"Kids",       labelAr:"أطفال" },
  { id:"pyjamas", label:"Pyjamas",    labelAr:"بيجامات" },
];

const PRODUCTS = [
  { id:1, name:"Noir Velvet Dress",    nameAr:"فستان نوار المخملي",    cat:"women",  price:420, oldPrice:680, img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80", tag:"NEW",   rating:5, reviews:42 },
  { id:2, name:"Crimson Silk Blouse",  nameAr:"بلوزة كريمسون الحريرية",cat:"women",  price:285, oldPrice:null,img:"https://images.unsplash.com/photo-1594938298603-c8148c4b5694?w=600&q=80", tag:"HOT",   rating:5, reviews:38 },
  { id:3, name:"Obsidian Trench",      nameAr:"معطف أوبسيديان",        cat:"women",  price:890, oldPrice:1200,img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80", tag:"SALE",  rating:4, reviews:27 },
  { id:4, name:"Shadow Knit Set",      nameAr:"طقم شادو المحبوك",      cat:"women",  price:340, oldPrice:null,img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80", tag:null,    rating:5, reviews:61 },
  { id:5, name:"Mini Raven Skirt",     nameAr:"تنورة رافن القصيرة",    cat:"women",  price:195, oldPrice:260, img:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", tag:"SALE",  rating:4, reviews:19 },
  { id:6, name:"Red Storm Jacket",     nameAr:"جاكيت ريد ستورم",       cat:"women",  price:560, oldPrice:null,img:"https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80", tag:"NEW",   rating:5, reviews:33 },
  { id:7, name:"Luna Kids Dress",      nameAr:"فستان لونا للأطفال",    cat:"kids",   price:145, oldPrice:200, img:"https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80", tag:"HOT",   rating:5, reviews:55 },
  { id:8, name:"Star Kids Set",        nameAr:"طقم ستار للأطفال",      cat:"kids",   price:120, oldPrice:null,img:"https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80", tag:null,    rating:4, reviews:23 },
  { id:9, name:"Velvet Dreams Pyjama", nameAr:"بيجاما فيلفيت دريمز",   cat:"pyjamas",price:210, oldPrice:280, img:"https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80", tag:"SALE",  rating:5, reviews:47 },
  { id:10,name:"Silk Night Set",       nameAr:"طقم سيلك نايت",         cat:"pyjamas",price:320, oldPrice:null,img:"https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80", tag:"NEW",   rating:5, reviews:29 },
];

const HERO_SLIDES = [
  { title:"DARE TO",       title2:"BE NOIR",    sub:"الأناقة في أبهى صورها",    img:"https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=90", accent:C.red },
  { title:"MADE FOR",      title2:"QUEENS",     sub:"أُصنعت لمن تستحق الأفضل", img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=90", accent:C.gold },
  { title:"THIS IS",       title2:"MOZHELA",    sub:"حيث الموضة تلتقي بالفن",   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90", accent:C.red },
];

/* ═══════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════ */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Bebas+Neue&family=Cairo:wght@400;600;700;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:${C.black};color:${C.white};font-family:'Cairo',sans-serif;overflow-x:hidden;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-track{background:${C.black};}
  ::-webkit-scrollbar-thumb{background:${C.red};border-radius:2px;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideLeft{from{transform:translateX(100%)}to{transform:translateX(0)}}
  @keyframes slideRight{from{transform:translateX(-100%)}to{transform:translateX(0)}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
  @keyframes rotateSlow{to{transform:rotate(360deg)}}
  @keyframes glowRed{0%,100%{box-shadow:0 0 20px rgba(232,0,26,0.4)}50%{box-shadow:0 0 50px rgba(232,0,26,0.8)}}
  @keyframes marqueeLine{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  @keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

  .product-card:hover .card-img{transform:scale(1.08);}
  .product-card:hover .card-overlay{opacity:1;}
  .product-card:hover{transform:translateY(-8px) rotateX(3deg) rotateY(-1deg);box-shadow:0 40px 80px rgba(232,0,26,0.2),0 0 0 1px rgba(232,0,26,0.3);}
  .product-card{transform-style:preserve-3d;transition:transform 0.5s cubic-bezier(.23,1,.32,1),box-shadow 0.5s ease;}

  .nav-link{position:relative;}
  .nav-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:${C.red};transition:width 0.3s ease;}
  .nav-link:hover::after{width:100%;}

  .btn-primary{background:${C.red};color:#fff;border:none;cursor:pointer;font-family:'Cairo',sans-serif;font-weight:700;transition:all 0.3s ease;position:relative;overflow:hidden;}
  .btn-primary::before{content:'';position:absolute;inset:0;background:rgba(255,255,255,0.15);transform:translateX(-100%);transition:transform 0.4s ease;}
  .btn-primary:hover::before{transform:translateX(0);}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(232,0,26,0.5);}

  .filter-btn{transition:all 0.3s ease;}
  .filter-btn:hover{color:${C.white}!important;border-color:rgba(232,0,26,0.5)!important;}

  .cart-badge{animation:glowRed 2s ease-in-out infinite;}
`;

/* ═══════════════════════════════════════
   MARQUEE TICKER
═══════════════════════════════════════ */
function Marquee() {
  const items = ["NEW ARRIVALS","WOMEN","KIDS","PYJAMAS","FREE SHIPPING OVER $200","EXCLUSIVE DESIGNS","مجموعة جديدة","تصاميم حصرية","شحن مجاني"];
  const doubled = [...items,...items];
  return (
    <div style={{background:C.red,padding:"9px 0",overflow:"hidden",position:"relative",zIndex:100}}>
      <div style={{display:"flex",gap:48,animation:"marqueeLine 22s linear infinite",width:"max-content"}}>
        {doubled.map((t,i)=>(
          <span key={i} style={{fontSize:11,fontWeight:900,letterSpacing:3,whiteSpace:"nowrap",fontFamily:"'Bebas Neue',sans-serif",display:"flex",alignItems:"center",gap:16}}>
            {t}
            <span style={{color:"rgba(255,255,255,0.5)"}}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   NAVBAR
═══════════════════════════════════════ */
function Navbar({lang,setLang,cart,page,setPage}){
  const [scrolled,setScrolled]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);
  const isAr=lang==="ar";

  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>60);
    window.addEventListener("scroll",h);
    return()=>window.removeEventListener("scroll",h);
  },[]);

  const navLinks=[
    {id:"home",   en:"Home",   ar:"الرئيسية"},
    {id:"shop",   en:"Shop",   ar:"المتجر"},
    {id:"women",  en:"Women",  ar:"نساء"},
    {id:"kids",   en:"Kids",   ar:"أطفال"},
    {id:"pyjamas",en:"Pyjamas",ar:"بيجامات"},
  ];

  return(
    <>
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:1000,
        background:scrolled?"rgba(8,6,8,0.97)":"transparent",
        backdropFilter:scrolled?"blur(20px)":"none",
        borderBottom:scrolled?`1px solid ${C.border}`:"none",
        transition:"all 0.4s ease",
        padding:"0 40px",height:72,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        direction:isAr?"rtl":"ltr",
      }}>
        {/* Logo */}
        <div onClick={()=>setPage("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
          <div style={{
            width:36,height:36,background:C.red,
            display:"flex",alignItems:"center",justifyContent:"center",
            clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
            flexShrink:0,
          }}>
            <span style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:16,color:"#fff"}}>M</span>
          </div>
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:4,color:C.white,lineHeight:1}}>MOZHELA</div>
            <div style={{fontSize:8,letterSpacing:6,color:C.red,fontWeight:700}}>FASHION HOUSE</div>
          </div>
        </div>

        {/* Nav Links desktop */}
        <div style={{display:"flex",gap:28,alignItems:"center"}}>
          {navLinks.map(l=>(
            <button key={l.id} className="nav-link"
              onClick={()=>setPage(l.id)}
              style={{
                background:"none",border:"none",cursor:"pointer",
                color:page===l.id?C.red:C.gray,
                fontSize:13,fontWeight:700,letterSpacing:1,
                fontFamily:"'Cairo',sans-serif",
                transition:"color 0.3s",
              }}
            >{isAr?l.ar:l.en}</button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          {/* Lang toggle */}
          <button onClick={()=>setLang(isAr?"en":"ar")} style={{
            background:"rgba(255,255,255,0.06)",border:`1px solid ${C.border}`,
            color:C.gray,fontSize:12,fontWeight:800,padding:"6px 14px",
            borderRadius:4,cursor:"pointer",letterSpacing:1,
            fontFamily:"'Cairo',sans-serif",transition:"all 0.3s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=C.red;e.currentTarget.style.color=C.white;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray;}}
          >{isAr?"EN":"AR"}</button>

          {/* Cart */}
          <button onClick={()=>setPage("cart")} style={{
            background:"none",border:"none",cursor:"pointer",
            position:"relative",display:"flex",alignItems:"center",gap:8,
            color:C.white,fontSize:13,fontWeight:700,
            fontFamily:"'Cairo',sans-serif",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cart.length>0&&(
              <span className="cart-badge" style={{
                position:"absolute",top:-6,right:-8,
                width:18,height:18,borderRadius:"50%",
                background:C.red,color:"#fff",
                fontSize:10,fontWeight:900,
                display:"flex",alignItems:"center",justifyContent:"center",
              }}>{cart.length}</span>
            )}
            {isAr?"السلة":"Cart"}
          </button>

          {/* Checkout */}
          <button className="btn-primary" onClick={()=>setPage("checkout")}
            style={{padding:"9px 20px",borderRadius:4,fontSize:12,fontWeight:800,letterSpacing:1}}>
            {isAr?"الدفع":"CHECKOUT"}
          </button>
        </div>
      </nav>
    </>
  );
}

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
function Hero({lang,setPage}){
  const [slide,setSlide]=useState(0);
  const [prev,setPrev]=useState(null);
  const [animDir,setAnimDir]=useState("left");
  const isAr=lang==="ar";

  useEffect(()=>{
    const t=setInterval(()=>next(),5500);
    return()=>clearInterval(t);
  },[slide]);

  const next=()=>{
    setPrev(slide);setAnimDir("left");
    setSlide(s=>(s+1)%HERO_SLIDES.length);
  };
  const goSlide=(i)=>{
    if(i===slide)return;
    setPrev(slide);setAnimDir(i>slide?"left":"right");
    setSlide(i);
  };

  const s=HERO_SLIDES[slide];

  return(
    <section style={{height:"100vh",position:"relative",overflow:"hidden",display:"flex",alignItems:"center"}}>
      {/* Background image */}
      <div key={slide} style={{
        position:"absolute",inset:0,
        backgroundImage:`url(${s.img})`,
        backgroundSize:"cover",backgroundPosition:"center",
        animation:`${animDir==="left"?"slideRight":"slideLeft"} 0.9s cubic-bezier(.23,1,.32,1)`,
      }}>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(105deg,rgba(8,6,8,0.92) 0%,rgba(8,6,8,0.7) 50%,rgba(8,6,8,0.3) 100%)`}}/>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 80% 50%,rgba(232,0,26,0.06) 0%,transparent 60%)`}}/>
      </div>

      {/* Decorative elements */}
      <div style={{position:"absolute",top:"15%",right:"8%",width:280,height:280,border:`1px solid rgba(232,0,26,0.12)`,borderRadius:"50%",animation:"rotateSlow 30s linear infinite",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"20%",right:"11%",width:200,height:200,border:`1px solid rgba(232,0,26,0.08)`,borderRadius:"50%",animation:"rotateSlow 20s linear infinite reverse",pointerEvents:"none"}}/>

      {/* Content */}
      <div key={`content-${slide}`} style={{
        position:"relative",zIndex:2,
        padding:"0 80px",maxWidth:800,
        animation:"fadeUp 0.8s cubic-bezier(.23,1,.32,1)",
        direction:isAr?"rtl":"ltr",
      }}>
        {/* Tag */}
        <div style={{
          display:"inline-flex",alignItems:"center",gap:8,
          marginBottom:24,
          fontSize:11,letterSpacing:4,fontWeight:900,color:s.accent,
          fontFamily:"'Bebas Neue',sans-serif",
        }}>
          <div style={{width:30,height:1,background:s.accent}}/>
          {isAr?"مجموعة موزيلا الحصرية":"MOZHELA EXCLUSIVE COLLECTION"}
          <div style={{width:30,height:1,background:s.accent}}/>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:"clamp(72px,11vw,160px)",
          lineHeight:0.9,letterSpacing:2,
          color:C.white,marginBottom:0,
        }}>{s.title}</h1>
        <h1 style={{
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:"clamp(72px,11vw,160px)",
          lineHeight:0.9,letterSpacing:2,
          color:s.accent,marginBottom:32,
          WebkitTextStroke:`1px ${s.accent}`,
        }}>{s.title2}</h1>

        <p style={{
          color:C.gray,fontSize:16,lineHeight:1.8,
          marginBottom:40,fontFamily:"'Cairo',sans-serif",
          maxWidth:440,fontWeight:400,
        }}>{s.sub}</p>

        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          <button className="btn-primary"
            onClick={()=>setPage("shop")}
            style={{padding:"15px 40px",borderRadius:3,fontSize:13,fontWeight:900,letterSpacing:2,fontFamily:"'Bebas Neue',sans-serif"}}>
            {isAr?"تسوقي الآن →":"SHOP NOW →"}
          </button>
          <button onClick={()=>setPage("about")} style={{
            background:"transparent",border:`1px solid rgba(245,240,240,0.25)`,
            color:C.gray,padding:"15px 32px",borderRadius:3,cursor:"pointer",
            fontSize:13,fontWeight:900,letterSpacing:2,
            fontFamily:"'Bebas Neue',sans-serif",transition:"all 0.3s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=C.white;e.currentTarget.style.color=C.white;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(245,240,240,0.25)";e.currentTarget.style.color=C.gray;}}
          >{isAr?"اكتشفي أكثر":"EXPLORE MORE"}</button>
        </div>

        {/* Stats */}
        <div style={{display:"flex",gap:40,marginTop:56,paddingTop:32,borderTop:`1px solid rgba(245,240,240,0.08)`}}>
          {[["500+",isAr?"منتج":"Products"],["50K+",isAr?"عميلة":"Customers"],["4.9★",isAr?"تقييم":"Rating"]].map(([n,l],i)=>(
            <div key={i}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:s.accent,letterSpacing:1}}>{n}</div>
              <div style={{fontSize:11,color:C.faint,letterSpacing:2,fontWeight:700}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide dots */}
      <div style={{position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",display:"flex",gap:10,zIndex:3}}>
        {HERO_SLIDES.map((_,i)=>(
          <button key={i} onClick={()=>goSlide(i)} style={{
            width:i===slide?28:8,height:8,borderRadius:4,
            background:i===slide?C.red:"rgba(245,240,240,0.2)",
            border:"none",cursor:"pointer",transition:"all 0.4s ease",padding:0,
          }}/>
        ))}
      </div>

      {/* Slide number */}
      <div style={{position:"absolute",bottom:32,right:40,fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:C.faint,letterSpacing:3,zIndex:3}}>
        {String(slide+1).padStart(2,"0")} / {String(HERO_SLIDES.length).padStart(2,"0")}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PRODUCT CARD
═══════════════════════════════════════ */
function ProductCard({p,lang,onAdd,onOpen,i}){
  const [hov,setHov]=useState(false);
  const [added,setAdded]=useState(false);
  const isAr=lang==="ar";
  const disc=p.oldPrice?Math.round((1-p.price/p.oldPrice)*100):null;

  const handleAdd=(e)=>{
    e.stopPropagation();
    onAdd(p);setAdded(true);
    setTimeout(()=>setAdded(false),1800);
  };

  return(
    <div className="product-card"
      onClick={()=>onOpen(p)}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background:C.card,
        border:`1px solid ${hov?C.border:"rgba(245,240,240,0.05)"}`,
        borderRadius:2,overflow:"hidden",cursor:"pointer",
        animation:`fadeUp 0.6s ease ${i*0.07}s both`,
        perspective:1000,
      }}
    >
      {/* Image */}
      <div style={{height:320,overflow:"hidden",position:"relative"}}>
        <img src={p.img} alt={p.name} className="card-img"
          style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.7s cubic-bezier(.23,1,.32,1)"}}
          onError={e=>e.target.src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80"}
        />

        {/* Overlay */}
        <div className="card-overlay" style={{
          position:"absolute",inset:0,
          background:"linear-gradient(to top,rgba(8,6,8,0.9) 0%,rgba(8,6,8,0.2) 60%,transparent 100%)",
          opacity:0,transition:"opacity 0.4s ease",
          display:"flex",alignItems:"flex-end",padding:16,
        }}>
          <button className="btn-primary" onClick={handleAdd}
            style={{width:"100%",padding:"12px",borderRadius:2,fontSize:12,fontWeight:900,letterSpacing:2,fontFamily:"'Bebas Neue',sans-serif"}}>
            {added?(isAr?"✓ أُضيف":"✓ ADDED"):(isAr?"أضف للسلة":"ADD TO CART")}
          </button>
        </div>

        {/* Badges */}
        <div style={{position:"absolute",top:12,left:12,display:"flex",flexDirection:"column",gap:5}}>
          {p.tag&&(
            <span style={{
              background:p.tag==="NEW"?C.red:p.tag==="HOT"?"#ff6b00":p.tag==="SALE"?C.crimson:"transparent",
              color:"#fff",fontSize:9,fontWeight:900,padding:"4px 8px",letterSpacing:2,
              fontFamily:"'Bebas Neue',sans-serif",
            }}>{p.tag}</span>
          )}
          {disc&&(
            <span style={{background:C.gold,color:C.black,fontSize:9,fontWeight:900,padding:"4px 8px",letterSpacing:1,fontFamily:"'Bebas Neue',sans-serif"}}>-{disc}%</span>
          )}
        </div>
      </div>

      {/* Info */}
      <div style={{padding:"16px 18px 20px",direction:isAr?"rtl":"ltr"}}>
        <div style={{fontSize:10,color:C.red,letterSpacing:3,fontWeight:700,marginBottom:5,fontFamily:"'Bebas Neue',sans-serif"}}>
          {p.cat.toUpperCase()}
        </div>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:C.white,fontWeight:700,marginBottom:10,lineHeight:1.3}}>
          {isAr?p.nameAr:p.name}
        </h3>

        {/* Rating */}
        <div style={{display:"flex",gap:2,marginBottom:12,alignItems:"center"}}>
          {[...Array(5)].map((_,i)=>(
            <span key={i} style={{color:i<p.rating?C.gold:"rgba(245,240,240,0.15)",fontSize:11}}>★</span>
          ))}
          <span style={{color:C.faint,fontSize:11,marginRight:6}}>({p.reviews})</span>
        </div>

        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:C.white,letterSpacing:1}}>${p.price}</span>
            {p.oldPrice&&<span style={{fontSize:13,color:C.faint,textDecoration:"line-through"}}>${p.oldPrice}</span>}
          </div>
          <button className="btn-primary" onClick={handleAdd}
            style={{padding:"8px 16px",borderRadius:2,fontSize:11,fontWeight:900,letterSpacing:1,fontFamily:"'Bebas Neue',sans-serif"}}>
            {added?"✓":(isAr?"سلة":"CART")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   PRODUCT MODAL
═══════════════════════════════════════ */
function ProductModal({p,lang,onClose,onAdd}){
  const [qty,setQty]=useState(1);
  const [size,setSize]=useState("");
  const [tab,setTab]=useState("desc");
  const [added,setAdded]=useState(false);
  const isAr=lang==="ar";
  if(!p)return null;

  const handleAdd=()=>{
    onAdd(p,qty);setAdded(true);
    setTimeout(()=>setAdded(false),2000);
  };

  return(
    <div style={{position:"fixed",inset:0,zIndex:9000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(8,6,8,0.95)",backdropFilter:"blur(20px)",animation:"fadeIn 0.3s ease"}}/>
      <div style={{
        position:"relative",background:C.card,
        border:`1px solid ${C.border}`,
        borderRadius:2,maxWidth:900,width:"100%",maxHeight:"90vh",overflowY:"auto",
        animation:"scaleIn 0.4s cubic-bezier(.23,1,.32,1)",
        display:"grid",gridTemplateColumns:"1fr 1fr",
        direction:isAr?"rtl":"ltr",
      }}>
        {/* Image */}
        <div style={{position:"relative",overflow:"hidden"}}>
          <img src={p.img} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover",minHeight:500}}
            onError={e=>e.target.src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80"}
          />
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(8,6,8,0.6),transparent 60%)"}}/>
          {p.tag&&<span style={{position:"absolute",top:16,left:16,background:C.red,color:"#fff",fontSize:10,fontWeight:900,padding:"5px 10px",letterSpacing:2,fontFamily:"'Bebas Neue',sans-serif"}}>{p.tag}</span>}
        </div>

        {/* Details */}
        <div style={{padding:"40px 36px",display:"flex",flexDirection:"column",gap:20}}>
          <button onClick={onClose} style={{position:"absolute",top:16,right:isAr?"auto":16,left:isAr?16:"auto",background:"rgba(245,240,240,0.08)",border:`1px solid ${C.border}`,color:C.gray,width:36,height:36,borderRadius:2,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>

          <div style={{fontSize:10,color:C.red,letterSpacing:4,fontWeight:900,fontFamily:"'Bebas Neue',sans-serif"}}>{p.cat.toUpperCase()}</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:C.white,fontWeight:700,lineHeight:1.2}}>{isAr?p.nameAr:p.name}</h2>

          <div style={{display:"flex",gap:4,alignItems:"center"}}>
            {[...Array(5)].map((_,i)=><span key={i} style={{color:i<p.rating?C.gold:"rgba(245,240,240,0.15)",fontSize:14}}>★</span>)}
            <span style={{color:C.faint,fontSize:12,marginRight:8}}>({p.reviews} {isAr?"تقييم":"reviews"})</span>
          </div>

          <div style={{display:"flex",alignItems:"baseline",gap:12}}>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:40,color:C.white,letterSpacing:1}}>${p.price}</span>
            {p.oldPrice&&<span style={{fontSize:18,color:C.faint,textDecoration:"line-through"}}>${p.oldPrice}</span>}
            {p.oldPrice&&<span style={{background:C.red,color:"#fff",fontSize:11,padding:"3px 8px",fontWeight:900,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1}}>SAVE {Math.round((1-p.price/p.oldPrice)*100)}%</span>}
          </div>

          {/* Sizes */}
          <div>
            <div style={{fontSize:11,color:C.faint,letterSpacing:2,fontWeight:700,marginBottom:10}}>{isAr?"المقاس":"SIZE"}</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {["XS","S","M","L","XL","XXL"].map(s=>(
                <button key={s} onClick={()=>setSize(s)} style={{
                  width:40,height:40,border:`1px solid ${size===s?C.red:"rgba(245,240,240,0.15)"}`,
                  background:size===s?C.red:"transparent",
                  color:size===s?"#fff":C.gray,
                  fontSize:11,fontWeight:900,cursor:"pointer",
                  transition:"all 0.2s",fontFamily:"'Cairo',sans-serif",
                  borderRadius:2,
                }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:11,color:C.faint,letterSpacing:2,fontWeight:700}}>{isAr?"الكمية":"QTY"}</div>
            <div style={{display:"flex",alignItems:"center",border:`1px solid ${C.border}`,borderRadius:2,overflow:"hidden"}}>
              {["-",qty,"+"].map((v,i)=>(
                <button key={i} onClick={()=>i===0?setQty(q=>Math.max(1,q-1)):i===2?setQty(q=>q+1):null}
                  style={{width:36,height:36,background:i===1?"transparent":"rgba(255,255,255,0.04)",border:"none",color:C.white,fontSize:i===1?15:18,cursor:i===1?"default":"pointer",fontFamily:"'Cairo',sans-serif",fontWeight:700}}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button className="btn-primary" onClick={handleAdd}
            style={{padding:"16px",borderRadius:2,fontSize:14,fontWeight:900,letterSpacing:3,fontFamily:"'Bebas Neue',sans-serif",width:"100%"}}>
            {added?(isAr?"✓ أُضيف للسلة":"✓ ADDED TO CART"):(isAr?"أضف للسلة":"ADD TO CART")}
          </button>

          {/* Tabs */}
          <div>
            <div style={{display:"flex",borderBottom:`1px solid rgba(245,240,240,0.08)`,marginBottom:14}}>
              {[["desc",isAr?"الوصف":"Description"],["care",isAr?"العناية":"Care"],["shipping",isAr?"الشحن":"Shipping"]].map(([id,label])=>(
                <button key={id} onClick={()=>setTab(id)} style={{
                  background:"none",border:"none",cursor:"pointer",
                  padding:"10px 16px",fontSize:12,fontWeight:700,letterSpacing:1,
                  color:tab===id?C.red:C.faint,
                  borderBottom:`2px solid ${tab===id?C.red:"transparent"}`,
                  transition:"all 0.2s",fontFamily:"'Cairo',sans-serif",
                  marginBottom:-1,
                }}>{label}</button>
              ))}
            </div>
            <p style={{color:C.gray,fontSize:13,lineHeight:1.9,fontFamily:"'Cairo',sans-serif"}}>
              {tab==="desc"?(isAr?"قطعة استثنائية من مجموعة موزيلا الحصرية، مصنوعة بأرقى الأقمشة وأدق التفاصيل":"An exceptional piece from Mozhela's exclusive collection, crafted with the finest fabrics and meticulous attention to detail.")
               :tab==="care"?(isAr?"غسيل يدوي بماء بارد، تجنب التجفيف الآلي، كي على درجة حرارة منخفضة":"Hand wash in cold water, avoid tumble drying, iron on low heat.")
               :(isAr?"شحن مجاني للطلبات فوق $200، التسليم خلال 3-5 أيام عمل":"Free shipping on orders over $200, delivery within 3-5 business days.")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SHOP PAGE
═══════════════════════════════════════ */
function Shop({lang,cart,onAdd,filter:initFilter="all"}){
  const [filter,setFilter]=useState(initFilter);
  const [selected,setSelected]=useState(null);
  const [sort,setSort]=useState("default");
  const isAr=lang==="ar";

  const filtered=PRODUCTS
    .filter(p=>filter==="all"||p.cat===filter)
    .sort((a,b)=>sort==="price-asc"?a.price-b.price:sort==="price-desc"?b.price-a.price:sort==="rating"?b.rating-a.rating:0);

  return(
    <>
      <section style={{minHeight:"100vh",padding:"120px 40px 80px",background:C.black,direction:isAr?"rtl":"ltr"}}>
        <div style={{maxWidth:1300,margin:"0 auto"}}>

          {/* Header */}
          <div style={{marginBottom:52,display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:16}}>
            <div>
              <div style={{fontSize:11,color:C.red,letterSpacing:4,fontWeight:900,marginBottom:8,fontFamily:"'Bebas Neue',sans-serif"}}>{isAr?"مجموعاتنا":"OUR COLLECTIONS"}</div>
              <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:64,letterSpacing:2,color:C.white,lineHeight:0.9}}>
                {isAr?"المتجر":"SHOP"}
              </h1>
              <div style={{width:60,height:2,background:C.red,marginTop:12}}/>
            </div>
            {/* Sort */}
            <select value={sort} onChange={e=>setSort(e.target.value)} style={{
              background:C.card,border:`1px solid ${C.border}`,color:C.gray,
              padding:"10px 16px",borderRadius:2,fontSize:12,fontWeight:700,
              fontFamily:"'Cairo',sans-serif",cursor:"pointer",outline:"none",letterSpacing:1,
            }}>
              <option value="default">{isAr?"الافتراضي":"Default"}</option>
              <option value="price-asc">{isAr?"السعر: الأقل":"Price: Low to High"}</option>
              <option value="price-desc">{isAr?"السعر: الأعلى":"Price: High to Low"}</option>
              <option value="rating">{isAr?"الأعلى تقييماً":"Top Rated"}</option>
            </select>
          </div>

          {/* Filters */}
          <div style={{display:"flex",gap:6,marginBottom:44,flexWrap:"wrap"}}>
            {CATEGORIES.map(c=>(
              <button key={c.id} className="filter-btn" onClick={()=>setFilter(c.id)} style={{
                padding:"10px 22px",borderRadius:2,
                border:`1px solid ${filter===c.id?C.red:"rgba(245,240,240,0.12)"}`,
                background:filter===c.id?C.red:"transparent",
                color:filter===c.id?"#fff":C.gray,
                fontSize:11,fontWeight:900,cursor:"pointer",
                fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,
                transition:"all 0.3s",
              }}>{isAr?c.labelAr:c.label}</button>
            ))}
            <span style={{color:C.faint,fontSize:12,fontWeight:600,marginRight:"auto",alignSelf:"center",fontFamily:"'Cairo',sans-serif"}}>
              {filtered.length} {isAr?"منتج":"products"}
            </span>
          </div>

          {/* Grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
            {filtered.map((p,i)=>(
              <ProductCard key={p.id} p={p} lang={lang} onAdd={onAdd} onOpen={setSelected} i={i}/>
            ))}
          </div>
        </div>
      </section>
      <ProductModal p={selected} lang={lang} onClose={()=>setSelected(null)} onAdd={onAdd}/>
    </>
  );
}

/* ═══════════════════════════════════════
   CART PAGE
═══════════════════════════════════════ */
function Cart({lang,cart,setCart,setPage}){
  const isAr=lang==="ar";
  const total=cart.reduce((s,i)=>s+i.price*(i.qty||1),0);
  const remove=(id)=>setCart(c=>c.filter(i=>i.id!==id));
  const updateQty=(id,qty)=>setCart(c=>c.map(i=>i.id===id?{...i,qty}:i));

  if(cart.length===0)return(
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40,background:C.black,direction:isAr?"rtl":"ltr"}}>
      <div style={{fontSize:80,marginBottom:24,opacity:0.3}}>🛍</div>
      <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:42,color:C.white,letterSpacing:2,marginBottom:12}}>{isAr?"السلة فارغة":"CART IS EMPTY"}</h2>
      <p style={{color:C.faint,marginBottom:28,fontFamily:"'Cairo',sans-serif"}}>{isAr?"ابدأي التسوق الآن":"Start shopping now"}</p>
      <button className="btn-primary" onClick={()=>setPage("shop")} style={{padding:"14px 36px",borderRadius:2,fontSize:14,fontWeight:900,letterSpacing:3,fontFamily:"'Bebas Neue',sans-serif"}}>
        {isAr?"تسوقي الآن":"SHOP NOW"}
      </button>
    </section>
  );

  return(
    <section style={{minHeight:"100vh",padding:"120px 40px 80px",background:C.black,direction:isAr?"rtl":"ltr"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:64,color:C.white,letterSpacing:2,marginBottom:8}}>{isAr?"سلة التسوق":"YOUR CART"}</h1>
        <div style={{width:60,height:2,background:C.red,marginBottom:40}}/>

        <div style={{display:"grid",gridTemplateColumns:"1fr 360px",gap:24,alignItems:"start"}}>
          {/* Items */}
          <div style={{display:"flex",flexDirection:"column",gap:2}}>
            {cart.map((item,i)=>(
              <div key={item.id} style={{
                display:"flex",gap:16,alignItems:"center",
                background:C.card,border:`1px solid rgba(245,240,240,0.05)`,
                padding:"16px",animation:`fadeUp 0.4s ease ${i*0.06}s both`,
                direction:isAr?"rtl":"ltr",
              }}>
                <img src={item.img} alt={item.name} style={{width:80,height:80,objectFit:"cover",borderRadius:2,flexShrink:0}}
                  onError={e=>e.target.src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80"}
                />
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:C.white,fontWeight:700,marginBottom:3}}>{isAr?item.nameAr:item.name}</div>
                  <div style={{fontSize:10,color:C.red,letterSpacing:2,fontWeight:900,fontFamily:"'Bebas Neue',sans-serif"}}>{item.cat.toUpperCase()}</div>
                </div>
                {/* Qty controls */}
                <div style={{display:"flex",alignItems:"center",border:`1px solid ${C.border}`,borderRadius:2,overflow:"hidden"}}>
                  {["-",item.qty||1,"+"].map((v,i2)=>(
                    <button key={i2} onClick={()=>i2===0?updateQty(item.id,Math.max(1,(item.qty||1)-1)):i2===2?updateQty(item.id,(item.qty||1)+1):null}
                      style={{width:30,height:30,background:i2===1?"transparent":"rgba(255,255,255,0.04)",border:"none",color:C.white,fontSize:i2===1?13:16,cursor:i2===1?"default":"pointer",fontFamily:"'Cairo',sans-serif",fontWeight:700}}>
                      {v}
                    </button>
                  ))}
                </div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:C.white,letterSpacing:1,minWidth:70,textAlign:"center"}}>
                  ${item.price*(item.qty||1)}
                </div>
                <button onClick={()=>remove(item.id)} style={{background:"none",border:"none",color:C.faint,cursor:"pointer",fontSize:18,padding:4,transition:"color 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.color=C.red}
                  onMouseLeave={e=>e.currentTarget.style.color=C.faint}
                >✕</button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,padding:"28px 24px",position:"sticky",top:90}}>
            <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:C.white,letterSpacing:2,marginBottom:24}}>{isAr?"ملخص الطلب":"ORDER SUMMARY"}</h3>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24,paddingBottom:20,borderBottom:`1px solid rgba(245,240,240,0.07)`}}>
              {[
                [isAr?"المجموع الفرعي":"Subtotal","$"+total.toFixed(2)],
                [isAr?"الشحن":"Shipping",total>200?(isAr?"مجاني":"Free"):"$12.00"],
                [isAr?"الإجمالي":"TOTAL","$"+(total>200?total:total+12).toFixed(2)],
              ].map(([l,v],i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{color:i===2?C.white:C.faint,fontSize:i===2?13:12,fontWeight:i===2?900:600,fontFamily:"'Cairo',sans-serif",letterSpacing:i===2?1:0}}>{l}</span>
                  <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:i===2?22:16,color:i===2?C.white:v==="Free"?C.gold:C.white,letterSpacing:1}}>{v}</span>
                </div>
              ))}
            </div>
            {total>200&&<div style={{background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.2)",padding:"10px 12px",marginBottom:16,fontSize:12,color:C.gold,fontFamily:"'Cairo',sans-serif"}}>🎉 {isAr?"تهانينا! شحن مجاني":"Congrats! Free shipping applied"}</div>}
            <button className="btn-primary" onClick={()=>setPage("checkout")}
              style={{width:"100%",padding:"16px",borderRadius:2,fontSize:14,fontWeight:900,letterSpacing:3,fontFamily:"'Bebas Neue',sans-serif"}}>
              {isAr?"إتمام الشراء →":"CHECKOUT →"}
            </button>
            <button onClick={()=>setPage("shop")} style={{width:"100%",marginTop:10,background:"transparent",border:`1px solid rgba(245,240,240,0.1)`,color:C.gray,padding:"12px",borderRadius:2,cursor:"pointer",fontSize:12,fontWeight:700,letterSpacing:1,fontFamily:"'Cairo',sans-serif",transition:"all 0.3s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.white;e.currentTarget.style.color=C.white;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(245,240,240,0.1)";e.currentTarget.style.color=C.gray;}}
            >{isAr?"مواصلة التسوق":"Continue Shopping"}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CHECKOUT PAGE
═══════════════════════════════════════ */
function Checkout({lang,cart,setCart,setPage}){
  const isAr=lang==="ar";
  const [form,setForm]=useState({name:"",address:"",phone:"",coupon:""});
  const [placed,setPlaced]=useState(false);
  const total=cart.reduce((s,i)=>s+i.price*(i.qty||1),0);

  const handlePlace=()=>{
    if(!form.name||!form.address||!form.phone)return;
    setPlaced(true);
    setTimeout(()=>{setCart([]);setPage("home");},3500);
  };

  if(placed)return(
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:C.black,padding:40}}>
      <div style={{width:80,height:80,background:C.red,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,marginBottom:24,animation:"glowRed 2s ease-in-out infinite"}}>✓</div>
      <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:48,color:C.white,letterSpacing:2,marginBottom:12,textAlign:"center"}}>{isAr?"تم تأكيد طلبك!":"ORDER CONFIRMED!"}</h2>
      <p style={{color:C.faint,fontFamily:"'Cairo',sans-serif",textAlign:"center"}}>{isAr?"سنتواصل معك قريباً لتأكيد التسليم":"We'll contact you soon to confirm delivery"}</p>
    </section>
  );

  return(
    <section style={{minHeight:"100vh",padding:"120px 40px 80px",background:C.black,direction:isAr?"rtl":"ltr"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:64,color:C.white,letterSpacing:2,marginBottom:8}}>{isAr?"إتمام الطلب":"CHECKOUT"}</h1>
        <div style={{width:60,height:2,background:C.red,marginBottom:40}}/>

        <div style={{display:"grid",gridTemplateColumns:"1fr 380px",gap:24,alignItems:"start"}}>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {/* Delivery */}
            <div style={{background:C.card,border:`1px solid ${C.border}`,padding:"28px"}}>
              <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:C.white,letterSpacing:2,marginBottom:20}}>{isAr?"عنوان التسليم":"DELIVERY ADDRESS"}</h3>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {[["name",isAr?"الاسم الكامل":"Full Name","text"],["address",isAr?"العنوان الكامل":"Full Address","text"],["phone",isAr?"رقم الهاتف":"Phone Number","tel"]].map(([k,pl,type])=>(
                  <input key={k} type={type} placeholder={pl} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} style={{
                    background:"rgba(255,255,255,0.03)",border:`1px solid ${C.border}`,
                    padding:"13px 16px",color:C.white,fontSize:14,
                    fontFamily:"'Cairo',sans-serif",outline:"none",borderRadius:2,
                    transition:"border-color 0.2s",
                  }}
                  onFocus={e=>e.target.style.borderColor=C.red}
                  onBlur={e=>e.target.style.borderColor=C.border}
                  />
                ))}
              </div>
            </div>
            {/* Coupon */}
            <div style={{background:C.card,border:`1px solid ${C.border}`,padding:"24px"}}>
              <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:C.white,letterSpacing:2,marginBottom:16}}>{isAr?"كود الخصم":"COUPON CODE"}</h3>
              <div style={{display:"flex",gap:10}}>
                <input placeholder={isAr?"أدخل الكود":"Enter code"} value={form.coupon} onChange={e=>setForm(f=>({...f,coupon:e.target.value}))} style={{
                  flex:1,background:"rgba(255,255,255,0.03)",border:`1px solid ${C.border}`,
                  padding:"12px 16px",color:C.white,fontSize:14,
                  fontFamily:"'Cairo',sans-serif",outline:"none",borderRadius:2,
                }}
                onFocus={e=>e.target.style.borderColor=C.red}
                onBlur={e=>e.target.style.borderColor=C.border}
                />
                <button className="btn-primary" style={{padding:"12px 20px",borderRadius:2,fontSize:12,fontWeight:900,letterSpacing:2,fontFamily:"'Bebas Neue',sans-serif",flexShrink:0}}>
                  {isAr?"تطبيق":"APPLY"}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,padding:"28px",position:"sticky",top:90}}>
            <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:C.white,letterSpacing:2,marginBottom:20}}>{isAr?"ملخص الطلب":"ORDER SUMMARY"}</h3>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20,maxHeight:220,overflowY:"auto"}}>
              {cart.map(item=>(
                <div key={item.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                  <span style={{color:C.gray,fontSize:13,fontFamily:"'Cairo',sans-serif",flex:1}}>{isAr?item.nameAr:item.name} ×{item.qty||1}</span>
                  <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:C.white,flexShrink:0}}>${item.price*(item.qty||1)}</span>
                </div>
              ))}
            </div>
            <div style={{borderTop:`1px solid rgba(245,240,240,0.07)`,paddingTop:16,marginBottom:20,display:"flex",justifyContent:"space-between"}}>
              <span style={{color:C.white,fontWeight:900,fontFamily:"'Cairo',sans-serif",letterSpacing:1}}>{isAr?"الإجمالي":"TOTAL"}</span>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:C.white}}>${(total>200?total:total+12).toFixed(2)}</span>
            </div>
            <button className="btn-primary" onClick={handlePlace}
              style={{width:"100%",padding:"16px",borderRadius:2,fontSize:14,fontWeight:900,letterSpacing:3,fontFamily:"'Bebas Neue',sans-serif"}}>
              {isAr?"تأكيد الطلب ✓":"PLACE ORDER ✓"}
            </button>
            {/* Payment icons */}
            <div style={{display:"flex",gap:8,marginTop:16,justifyContent:"center",flexWrap:"wrap"}}>
              {["VISA","MC","AMEX","PAYPAL"].map(b=>(
                <span key={b} style={{background:"rgba(255,255,255,0.06)",border:`1px solid rgba(255,255,255,0.1)`,padding:"4px 8px",fontSize:9,fontWeight:900,color:C.faint,letterSpacing:1,fontFamily:"'Bebas Neue',sans-serif"}}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
function Footer({lang,setPage}){
  const isAr=lang==="ar";
  return(
    <footer style={{background:C.deep,borderTop:`1px solid rgba(232,0,26,0.1)`,padding:"60px 40px 24px",direction:isAr?"rtl":"ltr"}}>
      <div style={{maxWidth:1300,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:40,marginBottom:48}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <div style={{width:36,height:36,background:C.red,display:"flex",alignItems:"center",justifyContent:"center",clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)"}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:16,color:"#fff"}}>M</span>
              </div>
              <div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:4,color:C.white}}>MOZHELA</div>
                <div style={{fontSize:8,letterSpacing:6,color:C.red,fontWeight:700}}>FASHION HOUSE</div>
              </div>
            </div>
            <p style={{color:C.faint,fontSize:13,lineHeight:1.9,maxWidth:240,fontFamily:"'Cairo',sans-serif"}}>
              {isAr?"بيت الموضة الراقية — نصنع لك التميز في كل قطعة":"The house of refined fashion — crafting distinction in every piece."}
            </p>
            <div style={{marginTop:20,fontSize:12,color:C.faint,fontFamily:"'Cairo',sans-serif"}}>
              {isAr?"من السبت إلى الخميس 10ص - 10م":"Sat–Thu 10AM–10PM"}<br/>
              {isAr?"الجمعة 1م - 9م":"Friday 1PM–9PM"}
            </div>
          </div>
          {[
            {title:isAr?"روابط سريعة":"Quick Links",items:[["home",isAr?"الرئيسية":"Home"],["shop",isAr?"المتجر":"Shop"],["women",isAr?"نساء":"Women"],["kids",isAr?"أطفال":"Kids"]]},
            {title:isAr?"سياساتنا":"Policies",items:[["#",isAr?"الإرجاع والاستبدال":"Returns & Exchanges"],["#",isAr?"سياسة الشحن":"Shipping Policy"],["#",isAr?"الخصوصية":"Privacy Policy"],["#",isAr?"المساعدة":"Help Center"]]},
            {title:isAr?"تواصلي معنا":"Contact Us",items:[["#","mozhela@fashion.com"],["#","+966 50 000 0000"],["#",isAr?"الرياض، المملكة العربية السعودية":"Riyadh, Saudi Arabia"],["#","@mozhela.fashion"]]},
          ].map((col,i)=>(
            <div key={i}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:3,color:C.white,marginBottom:18}}>{col.title}</div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {col.items.map(([id,label])=>(
                  <button key={label} onClick={()=>id!=="#"&&setPage(id)} style={{
                    background:"none",border:"none",color:C.faint,fontSize:13,
                    cursor:id!=="#"?"pointer":"default",
                    fontFamily:"'Cairo',sans-serif",padding:0,
                    textAlign:isAr?"right":"left",transition:"color 0.2s",
                  }}
                  onMouseEnter={e=>{if(id!=="#")e.currentTarget.style.color=C.red;}}
                  onMouseLeave={e=>e.currentTarget.style.color=C.faint}
                  >{label}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid rgba(245,240,240,0.06)`,paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <span style={{color:C.faint,fontSize:12,fontFamily:"'Cairo',sans-serif"}}>© 2026 Mozhela Fashion House. {isAr?"جميع الحقوق محفوظة":"All Rights Reserved."}</span>
          <div style={{display:"flex",gap:10}}>
            {["VISA","MC","AMEX","PAYPAL","DISCOVER"].map(b=>(
              <span key={b} style={{background:"rgba(255,255,255,0.05)",border:`1px solid rgba(255,255,255,0.08)`,padding:"4px 8px",fontSize:8,fontWeight:900,color:C.faint,letterSpacing:1,fontFamily:"'Bebas Neue',sans-serif"}}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════ */
function Home({lang,setPage,cart,onAdd}){
  const isAr=lang==="ar";
  const featured=PRODUCTS.filter(p=>p.tag).slice(0,4);
  const [selected,setSelected]=useState(null);

  return(
    <>
      <Hero lang={lang} setPage={setPage}/>

      {/* Categories Strip */}
      <section style={{background:C.deep,padding:"56px 40px",borderTop:`1px solid rgba(232,0,26,0.1)`,direction:isAr?"rtl":"ltr"}}>
        <div style={{maxWidth:1300,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2}}>
            {[
              {cat:"women",  label:isAr?"المرأة":"WOMEN",    sub:isAr?"120+ قطعة":"120+ pieces", img:"https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80"},
              {cat:"kids",   label:isAr?"الأطفال":"KIDS",    sub:isAr?"60+ قطعة":"60+ pieces",  img:"https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=600&q=80"},
              {cat:"pyjamas",label:isAr?"البيجامات":"PYJAMAS",sub:isAr?"45+ قطعة":"45+ pieces", img:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80"},
            ].map((c,i)=>(
              <div key={i} onClick={()=>setPage(c.cat)} style={{
                position:"relative",height:360,overflow:"hidden",cursor:"pointer",
                animation:`fadeUp 0.6s ease ${i*0.1}s both`,
              }}
              onMouseEnter={e=>{e.currentTarget.querySelector("img").style.transform="scale(1.08)";e.currentTarget.querySelector(".cat-overlay").style.opacity="1";}}
              onMouseLeave={e=>{e.currentTarget.querySelector("img").style.transform="scale(1)";e.currentTarget.querySelector(".cat-overlay").style.opacity="0";}}
              >
                <img src={c.img} alt={c.label} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.7s cubic-bezier(.23,1,.32,1)"}}
                  onError={e=>e.target.src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80"}
                />
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(8,6,8,0.85) 0%,rgba(8,6,8,0.2) 60%,transparent 100%)"}}/>
                <div className="cat-overlay" style={{position:"absolute",inset:0,background:"rgba(232,0,26,0.15)",opacity:0,transition:"opacity 0.4s ease"}}/>
                <div style={{position:"absolute",bottom:24,left:24,right:24}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:C.white,letterSpacing:3,lineHeight:1}}>{c.label}</div>
                  <div style={{fontSize:12,color:"rgba(245,240,240,0.6)",fontFamily:"'Cairo',sans-serif",marginTop:4}}>{c.sub}</div>
                  <div style={{marginTop:12,fontSize:11,color:C.red,fontWeight:900,letterSpacing:2,fontFamily:"'Bebas Neue',sans-serif"}}>
                    {isAr?"تسوقي الآن ←":"SHOP NOW →"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section style={{padding:"80px 40px",background:C.black,direction:isAr?"rtl":"ltr"}}>
        <div style={{maxWidth:1300,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40,flexWrap:"wrap",gap:12}}>
            <div>
              <div style={{fontSize:11,color:C.red,letterSpacing:4,fontWeight:900,marginBottom:8,fontFamily:"'Bebas Neue',sans-serif"}}>{isAr?"الأكثر مبيعاً":"BEST SELLERS"}</div>
              <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:52,color:C.white,letterSpacing:2,lineHeight:0.9}}>{isAr?"المميزة":"FEATURED"}</h2>
            </div>
            <button onClick={()=>setPage("shop")} style={{background:"transparent",border:`1px solid ${C.border}`,color:C.gray,padding:"11px 24px",borderRadius:2,cursor:"pointer",fontSize:11,fontWeight:900,letterSpacing:2,fontFamily:"'Bebas Neue',sans-serif",transition:"all 0.3s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.red;e.currentTarget.style.color=C.red;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.gray;}}
            >{isAr?"عرض الكل →":"VIEW ALL →"}</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
            {featured.map((p,i)=><ProductCard key={p.id} p={p} lang={lang} onAdd={onAdd} onOpen={setSelected} i={i}/>)}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section style={{margin:"0 40px 80px",background:`linear-gradient(135deg,${C.crimson},${C.black})`,border:`1px solid rgba(232,0,26,0.2)`,padding:"52px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24,direction:isAr?"rtl":"ltr"}}>
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:4,color:C.gold,marginBottom:8}}>{isAr?"عرض محدود":"LIMITED OFFER"}</div>
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:52,color:C.white,letterSpacing:2,lineHeight:0.9,marginBottom:8}}>
            {isAr?"خصم 30%":"30% OFF"}
          </h2>
          <p style={{color:"rgba(245,240,240,0.7)",fontFamily:"'Cairo',sans-serif",fontSize:14}}>{isAr?"على جميع منتجات البيجامات هذا الأسبوع":"On all pyjamas collection this week"}</p>
        </div>
        <button className="btn-primary" onClick={()=>setPage("pyjamas")}
          style={{padding:"16px 44px",borderRadius:2,fontSize:15,fontWeight:900,letterSpacing:3,fontFamily:"'Bebas Neue',sans-serif",background:C.white,color:C.black}}>
          {isAr?"تسوقي البيجامات":"SHOP PYJAMAS"}
        </button>
      </section>

      <ProductModal p={selected} lang={lang} onClose={()=>setSelected(null)} onAdd={onAdd}/>
    </>
  );
}

/* ═══════════════════════════════════════
   APP ROOT
═══════════════════════════════════════ */
export default function App(){
  const [lang,setLang]=useState("ar");
  const [page,setPage]=useState("home");
  const [cart,setCart]=useState([]);

  const addToCart=useCallback((product,qty=1)=>{
    setCart(c=>{
      const exists=c.find(i=>i.id===product.id);
      if(exists)return c.map(i=>i.id===product.id?{...i,qty:(i.qty||1)+qty}:i);
      return[...c,{...product,qty}];
    });
  },[]);

  const isCategory=(p)=>["women","kids","pyjamas"].includes(p);

  return(
    <div style={{background:C.black,color:C.white,minHeight:"100vh",direction:lang==="ar"?"rtl":"ltr"}}>
      <style>{STYLES}</style>
      <Marquee/>
      <Navbar lang={lang} setLang={setLang} cart={cart} page={page} setPage={setPage}/>

      {page==="home"     && <Home     lang={lang} setPage={setPage} cart={cart} onAdd={addToCart}/>}
      {(page==="shop"||isCategory(page)) && <Shop lang={lang} cart={cart} onAdd={addToCart} filter={isCategory(page)?page:"all"}/>}
      {page==="cart"     && <Cart     lang={lang} cart={cart} setCart={setCart} setPage={setPage}/>}
      {page==="checkout" && <Checkout lang={lang} cart={cart} setCart={setCart} setPage={setPage}/>}

      <Footer lang={lang} setPage={setPage}/>

      {/* WhatsApp Float */}
      <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" style={{
        position:"fixed",bottom:24,left:24,zIndex:5000,
        width:52,height:52,borderRadius:"50%",
        background:"linear-gradient(135deg,#25D366,#128C7E)",
        display:"flex",alignItems:"center",justifyContent:"center",
        boxShadow:"0 4px 20px rgba(37,211,102,0.4)",
        textDecoration:"none",transition:"transform 0.3s ease",
      }}
      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.12)"}
      onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}