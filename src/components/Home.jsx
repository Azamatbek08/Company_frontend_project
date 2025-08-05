"use client"

import { useState } from "react"
import { useEffect } from "react"
import "./Style/home.css"

function Home() {
  const [companydata, setCompanyData] = useState([])
  const [blogs, setBlogs] = useState([])
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/projects/"),
      fetch("http://127.0.0.1:8000/api/blogs/"),
      fetch("http://127.0.0.1:8000/api/team/"),
    ])
      .then(async ([projectsRes, blogsRes, teamRes]) => {
        if (!projectsRes.ok || !blogsRes.ok || !teamRes.ok) {
          throw new Error("Ma'lumotlarni olishda xatolik yuz berdi")
        }
        const projectsData = await projectsRes.json()
        const blogsData = await blogsRes.json()
        const teamData = await teamRes.json()
        setCompanyData(projectsData)
        setBlogs(blogsData)
        setTeam(teamData)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <h1>Yuklanmoqda...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h2>Logo</h2>
            </div>
            <nav className="nav">
              <a href="#" className="nav-link">
                Kompaniya
              </a>
              <a href="#" className="nav-link">
                Loyihalar
              </a>
              <a href="#" className="nav-link">
                Xizmatlar
              </a>
              <a href="#" className="nav-link">
                Kontaktlar
              </a>
            </nav>
            <div className="header-contact">
              <span className="phone">+998 99 123 45 67</span>
              <button className="cta-button">Bog'lanish</button>
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Biz veb-saytlar, ilovalarni ishlab chiqamiz</h1>
              <p>
                Zamonaviy texnologiyalar yordamida sizning biznesingiz uchun professional veb-saytlar va mobil ilovalar
                yaratamiz. Bizning tajribali jamoamiz har bir loyihaga individual yondashadi.
              </p>
              <button className="hero-button">Batafsil</button>
            </div>
            <div className="hero-visual">
              <div className="hero-circle"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-content">
            <div className="stats-text">
              <h2>Kompaniya haqida</h2>
              <p>
                Bizning kompaniyamiz 5 yildan ortiq vaqt davomida raqamli yechimlar sohasida faoliyat yuritadi. Biz
                mijozlarimizning ehtiyojlarini tushunib, ularning biznesini rivojlantirishga yordam beramiz.
              </p>
              <p>
                Har bir loyiha uchun individual yondashuv va zamonaviy texnologiyalardan foydalanish bizning asosiy
                tamoyillarimizdir.
              </p>
            </div>
            <div className="stats-numbers">
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Yil tajriba</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4 yoqda</span>
                <span className="stat-label">Olib borilgan loyihalar</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Mutaxassislar</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4 yoqda</span>
                <span className="stat-label">Mamnun mijozlar</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2 className="section-title">Bizning afzalliklarimiz</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <div className="icon-circle">
                  <span>🎯</span>
                </div>
              </div>
              <h3>Individual yondashuv</h3>
              <p>
                Har bir mijoz uchun maxsus yechimlar ishlab chiqamiz va ularning biznes ehtiyojlarini hisobga olamiz.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <div className="icon-circle">
                  <span>⚡️</span>
                </div>
              </div>
              <h3>Tezkorlik</h3>
              <p>Loyihalarni belgilangan muddatlarda sifatli va tezkor tarzda amalga oshiramiz.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <div className="icon-circle">
                  <span>🚀</span>
                </div>
              </div>
              <h3>Professional xizmat</h3>
              <p>Zamonaviy texnologiyalar va eng so'nggi trendlardan foydalanib professional xizmat ko'rsatamiz.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <div className="icon-circle">
                  <span>🎯</span>
                </div>
              </div>
              <h3>Individual yondashuv</h3>
              <p>Mijozlarimizning har bir talabini diqqat bilan o'rganib, eng yaxshi yechimlarni taklif etamiz.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <div className="icon-circle">
                  <span>⚡️</span>
                </div>
              </div>
              <h3>Tezkorlik</h3>
              <p>Vaqtni tejash va samaradorlikni oshirish bizning ustuvor yo'nalishlarimizdan biridir.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <div className="icon-circle">
                  <span>🚀</span>
                </div>
              </div>
              <h3>Professional xizmat</h3>
              <p>Yuqori sifatli xizmat va mijozlar bilan uzoq muddatli hamkorlik o'rnatishga intilamiz.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Portfolio Section */}
      <section className="portfolio">
        <h2 className="section-title">Bizning loyihalarimiz</h2>
        <div className="container">
          <div className="portfolio-grid">
            {companydata.map((item) => {
              return (
                <div key={item.id} className="portfolio-item">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} />
                  <div className="portfolio-overlay">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <a href={item.link}>malumotni to'liq kurish</a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {/* Additional Services */}
      <section className="additional-services">
        <div className="container">
          <h2 className="section-title">Bizning xizmatlar</h2>
          <div className="additional-services-grid">
            <div className="additional-service-item">
              <div className="service-icon-small">🌐</div>
              <h4>Veb saytlar</h4>
              <p>Zamonaviy va responsive veb-saytlar yaratamiz</p>
            </div>
            <div className="additional-service-item">
              <div className="service-icon-small">📱</div>
              <h4>UX/UI Dizayn</h4>
              <p>Foydalanuvchi tajribasini yaxshilaydigan dizaynlar</p>
            </div>
            <div className="additional-service-item">
              <div className="service-icon-small">💼</div>
              <h4>Mobil ilovalar</h4>
              <p>iOS va Android uchun mobil ilovalar ishlab chiqamiz</p>
            </div>
            <div className="additional-service-item">
              <div className="service-icon-small">🎨</div>
              <h4>SMM</h4>
              <p>Ijtimoiy tarmoqlarda marketing va reklama</p>
            </div>
            <div className="additional-service-item">
              <div className="service-icon-small">📊</div>
              <h4>Grafik dizayn</h4>
              <p>Professional grafik dizayn xizmatlari</p>
            </div>
            <div className="additional-service-item">
              <div className="service-icon-small">🔧</div>
              <h4>Texnik qo'llab-quvvatlash</h4>
              <p>24/7 texnik yordam va qo'llab-quvvatlash</p>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Section */}
      <section className="blog">
        <div className="container">
          <h2 className="section-title">Blog yangilikalarimiz</h2>
          <div className="blog-grid">
            {blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <img src={blog.image || "/placeholder.svg"} alt={blog.title} />
                <div className="blog-content">
                  <span className="blog-date">{blog.date}</span>
                  <h4>{blog.title}</h4>
                  <p>{blog.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="team">
        <div className="container">
          <h2 className="section-title">Bizning jamoa</h2>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.id} className="team-member">
                <img src={member.photo || "/placeholder.svg"} alt={member.full_name} />
                <h4>{member.full_name}</h4>
                <p>{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-text">
              <h2>
                Sayt bo'yicha qo'shimcha ma'lumot olishingiz uchun quyidagi raqamga qo'ng'iroq qiling yoki telegramda
                yozing
              </h2>
              <div className="contact-info">
                <div className="contact-item">
                  <span>Telefon raqami:</span>
                  <p>+998 99 123 45 67</p>
                </div>
                <div className="contact-item">
                  <span>Qo'shimcha ma'lumot olish uchun telegramda yozing:</span>
                  <p>@username</p>
                </div>
              </div>
            </div>
            <div className="contact-awards">
              <h3>NIMA UCHUN BIZNI TANLAYSIZ?</h3>
              <div className="awards-grid">
                <div className="award-item">
                  <div className="award-icon gold"></div>
                  <span>Oltin medal</span>
                </div>
                <div className="award-item">
                  <div className="award-icon silver"></div>
                  <span>Kumush medal</span>
                </div>
                <div className="award-item">
                  <div className="award-icon bronze"></div>
                  <span>Bronza medal</span>
                </div>
                <div className="award-item">
                  <div className="award-icon red"></div>
                  <span>Maxsus mukofot</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3>LOGO</h3>
            </div>
            <div className="footer-info">
              <p>Bizning kompaniya professional veb-saytlar va mobil ilovalar yaratish bo'yicha xizmat ko'rsatadi.</p>
              <div className="footer-contact">
                <p>📞 +998 99 123 45 67</p>
                <p>📧 info@company.uz</p>
                <p>📍 Toshkent, O'zbekiston</p>
              </div>
            </div>
            <div className="footer-social">
              <a href="#" className="social-link">
                📘
              </a>
              <a href="#" className="social-link">
                📷
              </a>
              <a href="#" className="social-link">
                🐦
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
