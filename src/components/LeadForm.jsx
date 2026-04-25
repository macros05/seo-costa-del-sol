import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './LeadForm.module.css'

const businessTypes = [
  'Restaurante / Bar',
  'Clínica / Centro médico',
  'Taller / Mecánico',
  'Despacho profesional',
  'Gimnasio / Centro deportivo',
  'Tienda / Comercio',
  'Hotel / Apartamentos',
  'Academia / Formación',
  'Otro'
]

function FloatField({ label, type = 'text', name, register, error, autoComplete, validation }) {
  return (
    <div className={`${styles.field} ${error ? styles.fieldError : ''}`}>
      <input
        id={name}
        type={type}
        autoComplete={autoComplete}
        placeholder=" "
        className={styles.input}
        {...register(name, validation)}
      />
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <span className={styles.line} />
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={styles.error}
          >
            {error.message}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function CustomSelect({ value, onChange, error }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${styles.field} ${styles.select} ${error ? styles.fieldError : ''}`}>
      <button
        type="button"
        className={`${styles.selectBtn} ${value ? styles.selectFilled : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.label}>Tipo de negocio</span>
        <span className={styles.selectValue}>{value || ' '}</span>
        <svg
          className={`${styles.chev} ${open ? styles.chevOpen : ''}`}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
        <span className={styles.line} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className={styles.options}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            role="listbox"
          >
            {businessTypes.map((t) => (
              <li
                key={t}
                role="option"
                aria-selected={t === value}
                className={`${styles.option} ${t === value ? styles.optionActive : ''}`}
                onClick={() => {
                  onChange(t)
                  setOpen(false)
                }}
              >
                <span className={styles.optionDot} />
                {t}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={styles.error}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LeadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: { name: '', web: '', email: '', business: '' }
  })

  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')
  const [businessError, setBusinessError] = useState('')
  const business = watch('business')

  const onSubmit = async (data) => {
    setServerError('')
    if (!data.business) {
      setBusinessError('Elige un sector para tu negocio')
      return
    }
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'landing-costadelsol' })
      })
      setSuccess(true)
      reset()
    } catch (e) {
      setServerError('No se ha podido enviar. Inténtalo de nuevo en un minuto.')
    }
  }

  return (
    <section className={styles.section} id="contacto" aria-label="Solicita tu auditoría SEO gratis">
      <div className={`container ${styles.container}`}>
        <div className={styles.shell}>
          <motion.div
            className={styles.head}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">/ Empezar · 005</span>
            <h2 className={styles.title}>
              Recibe tu <br />
              <span className={styles.titleAccent}>auditoría SEO</span> gratis
            </h2>
            <p className={styles.note}>
              Sin compromiso. Sin letra pequeña. <br />
              Solo te digo qué mejorar.
            </p>

            <ul className={styles.checks}>
              <li><span /> Respuesta en menos de 48 horas</li>
              <li><span /> Informe en PDF + 3 quick wins</li>
              <li><span /> Sin llamadas comerciales agresivas</li>
            </ul>

            <div className={styles.contact}>
              <span className={styles.contactLabel}>O escríbeme directo</span>
              <a href="mailto:seo@marcosmorales.dev" className={styles.contactLink}>
                seo@marcosmorales.dev
              </a>
            </div>
          </motion.div>

          <motion.div
            className={styles.formWrap}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className={styles.form}
                  exit={{ opacity: 0, y: -10 }}
                  noValidate
                >
                  <div className={styles.formHead}>
                    <span className={styles.formN}>N° 001</span>
                    <span className={styles.formMeta}>Auditoría / Solicitud</span>
                  </div>

                  <FloatField
                    label="Nombre"
                    name="name"
                    autoComplete="name"
                    register={register}
                    error={errors.name}
                    validation={{
                      required: 'Necesito saber cómo te llamas',
                      minLength: { value: 2, message: 'Demasiado corto' }
                    }}
                  />

                  <FloatField
                    label="Web de tu negocio"
                    name="web"
                    type="url"
                    autoComplete="url"
                    register={register}
                    error={errors.web}
                    validation={{
                      required: 'Pásame la URL de tu web',
                      pattern: {
                        value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}([\/\w-]*)*\/?$/i,
                        message: 'Formato no válido (ej: https://tunegocio.es)'
                      }
                    }}
                  />

                  <FloatField
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    register={register}
                    error={errors.email}
                    validation={{
                      required: 'Necesito un email para enviarte el informe',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Email no válido'
                      }
                    }}
                  />

                  <CustomSelect
                    value={business}
                    onChange={(v) => {
                      setValue('business', v, { shouldValidate: true })
                      setBusinessError('')
                    }}
                    error={businessError}
                  />

                  <button
                    type="submit"
                    className={styles.submit}
                    disabled={isSubmitting}
                    data-cursor
                    data-cursor-text="Enviar"
                  >
                    <span className={styles.submitGlow} aria-hidden="true" />
                    <span>{isSubmitting ? 'Enviando…' : 'Enviar y recibir mi auditoría'}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1 8h13m0 0L9 3m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                    </svg>
                  </button>

                  {serverError && <span className={styles.serverError}>{serverError}</span>}

                  <p className={styles.fine}>
                    Al enviar aceptas que use tu email para responderte. Cero spam,
                    cero terceros, cero historias.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className={styles.success}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.svg
                    className={styles.checkSvg}
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="38"
                      stroke="var(--lime)"
                      strokeWidth="1.5"
                      fill="none"
                      variants={{
                        hidden: { pathLength: 0 },
                        visible: { pathLength: 1, transition: { duration: 0.7 } }
                      }}
                    />
                    <motion.path
                      d="M24 41 L36 53 L57 30"
                      stroke="var(--lime)"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="square"
                      variants={{
                        hidden: { pathLength: 0 },
                        visible: { pathLength: 1, transition: { delay: 0.5, duration: 0.5 } }
                      }}
                    />
                  </motion.svg>
                  <h3 className={styles.successTitle}>Mensaje recibido.</h3>
                  <p className={styles.successText}>
                    Te contactaré en menos de 48 horas con tu auditoría.
                  </p>
                  <button
                    type="button"
                    className={styles.successBack}
                    onClick={() => setSuccess(false)}
                  >
                    ← Enviar otra solicitud
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
