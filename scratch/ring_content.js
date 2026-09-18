function renderRingContent(ringNumber) {
  const isEn = magicIsEn();
  switch (ringNumber) {
    case 1:
      return `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Encabezado del Anillo 1 -->
          <div style="display: flex; align-items: center; gap: 14px; background: rgba(42,157,143,0.15); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--color-teal);">
            <span style="font-size: 2.8rem;">🌱</span>
            <div>
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">${isEn ? "Level 1: The Dragon Apprentice" : "Nivel 1: El Aprendiz de Dragón"}</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                ${isEn 
                  ? "&quot;Welcome to the First Ring! Becoming a draconian wizard is an incredible journey that will expand your mind.&quot;" 
                  : "&quot;¡Bienvenido al Primer Anillo! Convertirse en un mago draconiano es una aventura increíble que abrirá tu mente.&quot;"}
              </p>
            </div>
          </div>

          <p style="line-height: 1.6; color: var(--text-main); font-size: 1.05rem;">
            ${isEn 
              ? "Every great wizard must begin by mastering the most fundamental arts: <strong>concentration</strong>, <strong>visualization</strong> (the art of directing your imagination with purpose), and <strong>patience</strong>." 
              : "Todo gran mago debe empezar por dominar las habilidades más básicas: la <strong>concentración</strong>, la <strong>visualización</strong> (el arte de usar tu imaginación con fuerza) y la <strong>paciencia</strong>."}
          </p>

          <!-- Código y Símbolos del Aprendiz -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">${isEn ? "🔮 The Apprentice's Code & Symbols" : "🔮 El Código y los Símbolos del Aprendiz"}</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(233,196,106,0.08); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "📜 Your Magical Motto:" : "📜 Tu Lema Mágico:"}</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  ${isEn ? "&quot;To be called is to have a destiny. Know thyself well.&quot;" : "&quot;Ser llamado es tener un destino. Conócete bien a vos mismo.&quot;"}
                </p>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "This reminds us that every being plays a meaningful part in this world. To practice magic safely, you must first be completely honest with yourself about your own feelings, your gifts, and your shortcomings." 
                    : "Esto significa que todos tenemos un papel importante en este mundo. Para hacer magia de forma segura, primero debés ser honesto sobre tus propios sentimientos, tus talentos y tus defectos."}
                </p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                <div style="background: rgba(42,157,143,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--color-teal);">
                  <h5 style="color: var(--color-teal); margin: 0; font-size: 1.1rem;">${isEn ? "🟦 Your Color: Pure Blue" : "🟦 Tu Color: El Azul"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "The color of serene emotions and inner mind clarity. Find a blue ribbon (about 60 cm) to drape across your shoulders whenever you sit to meditate or cast your exercises." 
                      : "Es el color de las emociones tranquilas y la magia de la mente. Conseguí un listón azul (de unos 60 cm) para ponértelo sobre los hombros cada vez que vayas a practicar tus hechizos o a meditar."}
                  </p>
                </div>

                <div style="background: rgba(200,85,61,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--color-rust);">
                  <h5 style="color: var(--color-rust); margin: 0; font-size: 1.1rem;">${isEn ? "⭐ Your Symbol: The Elven Star" : "⭐ Tu Símbolo: La Estrella Élfica"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "The seven-pointed star (heptagram). Drawing it or tracing its path with your finger allows your mind to quiet down, opening gentle communion with dragon realms." 
                      : "La estrella de 7 puntas. Dibujarla o seguir su forma con el dedo ayuda a que tu mente se relaje y sea más fácil contactar con el mundo mágico."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tus Primeras Herramientas Mágicas -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">${isEn ? "📚 Your First Magical Grimoires" : "📚 Tus Primeras Herramientas Mágicas"}</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">
              ${isEn ? "Every apprentice must acquire or craft two very special books:" : "Todo aprendiz necesita fabricar o conseguir dos libros muy especiales:"}
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "📖 1. The Dragon's Secrets" : "📖 1. Los Secretos del Dragón"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "A private journal where you write each day about your insights, vivid dreams, and how your daily life flourishes as you progress along the path." 
                    : "Un diario secreto donde escribirás todos los días tus pensamientos, tus sueños y cómo cambia tu vida a medida que avanzas en tus estudios mágicos."}
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">📁 2. The Dragon's Hoard" : "📁 2. El Tesoro del Dragón"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "A binder or ledger where you store your rituals, sacred drawings, and results. Inscribe upon its first page: <em>&quot;This Book of Wisdom is written by the hand of [Your Magical Name]!&quot;</em>" 
                    : "Una carpeta con anillas donde guardarás tus rituales, hechizos y resultados. Escribí en la primera página con tus mejores colores: <em>&quot;¡Este libro de secretos está escrito por la mano de [Tu Nombre Mágico]!&quot;</em>"}
                </p>
              </div>
            </div>
          </div>

          <!-- Tu Nuevo Mejor Amigo: El Dragón Guardián -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(233,196,106,0.08); border: 1px solid var(--gold-main);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">${isEn ? "🐉 Your Guardian Dragon: First Companion" : "🐉 Tu Nuevo Mejor Amigo: El Dragón Guardián"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 1rem;">
              ${isEn 
                ? "At this stage you meet your very first magical companion. Guardian dragons are the youthful scouts of their clan; some are so petite they could nestle in the palm of your hand!" 
                : "En este nivel vas a conocer a tu primer compañero mágico. Los dragones guardianes son los más jóvenes de su especie, ¡y algunos son tan pequeños que caben en la palma de tu mano!"}
            </p>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 1rem;">
              ${isEn 
                ? "They are playful, inquisitive beings who delight in warming scents like <strong>ginger</strong>, enjoy joyful music, and love watching you dance without worry. They are allies and friends—never order them around or treat them as servants, or they will depart like morning mist!" 
                : "Son criaturas súper juguetonas a las que les encantan los aromas dulces y picantes, como el del <strong>jengibre</strong>, además de disfrutar la música y verte bailar libremente. Ellos serán tus colaboradores, así que recordá la regla de oro: nunca intentes darles órdenes ni tratarlos como sirvientes, ¡o se irán!"}
            </p>
          </div>

          <!-- Misión 1: El Ritual de Contacto -->
          <div class="fantasy-panel" style="padding: 1.6rem; border: 2px solid var(--color-teal); background: rgba(42,157,143,0.1);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.4rem; text-align: center;">${isEn ? "📜 Quest 1: The First Contact Ritual" : "📜 Misión 1: El Ritual de Contacto"}</h4>
            <p style="text-align: center; color: var(--text-gold); font-size: 0.95rem; margin-top: 4px;">
              ${isEn ? "Follow these 6 sacred steps to invite your guardian dragon and introduce yourself with warmth:" : "Seguí estos 6 pasos para invitar a tu dragón guardián a jugar y presentarte oficialmente:"}
            </p>

            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 1.2rem;">
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">${isEn ? "Step 1:" : "Paso 1:"}</strong> ${isEn ? "Find a quiet sanctuary in your room where you will not be disturbed, and place your blue Apprentice ribbon across your shoulders." : "Andá a un lugar tranquilo de tu cuarto donde nadie te interrumpa y colocate tu listón azul de Aprendiz sobre los hombros."}
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">${isEn ? "Step 2:" : "Paso 2:"}</strong> ${isEn ? "Sit comfortably, close your eyes, breathe deeply to unwind, and speak aloud with sincerity:" : "Sentate cómodamente, cerrá los ojos, respirá profundo para relajarte y decí en voz alta:"}
                <p style="margin: 8px 0 0 0; font-style: italic; color: var(--text-gold); background: rgba(233,196,106,0.1); padding: 10px; border-radius: 8px;">
                  ${isEn 
                    ? "&quot;I rest secure within the circle of the Dragon Apprentice. In this sanctuary, I invite and call my guardian dragon to dwell beside me. I offer you loyal and heartfelt friendship.&quot;" 
                    : "&quot;Estoy a salvo en el poderoso anillo del Dragón Aprendiz. Mientras me siento en este espacio, invito y llamo a mi dragón guardián para que esté aquí conmigo. Te ofrezco una amistad leal y cálida.&quot;"}
                </p>
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">${isEn ? "Step 3:" : "Paso 3:"}</strong> ${isEn ? "Allow your thoughts to drift without tense expectation. Soon, you may sense a faint breeze on your neck, a subtle tingle on your skin, or an unmistakable certainty that you are no longer alone." : "Dejá que tus pensamientos vuelen sin esperar nada en particular. En poco tiempo, es posible que sientas una ligera brisa en el cuello, un leve roce en tu piel, o simplemente una sensación muy fuerte de que ya no estás solo en tu cuarto."}
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">${isEn ? "Step 4:" : "Paso 4:"}</strong> ${isEn ? "Dragons often perch quietly behind you—do not expect them to hover before physical eyes. Instead, look through your imagination: you might glimpse iridescent scales, a twitching tail, or a warm luminous eye." : "A los dragones les gusta pararse detrás de vos, así que no esperes verlos flotando frente a tus ojos físicos. En cambio, míralo a través de tu imaginación con los ojos cerrados: puede que veas un destello de su cuerpo o un gran ojo amigable mirándote."}
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">${isEn ? "Step 5:" : "Paso 5:"}</strong> ${isEn ? "Send a wave of mental friendship. In return, your dragon will surround you with reassuring warmth, like a gentle invisible hug. From this moment forth, you are companions." : "Envíale mentalmente un gran saludo de amistad. A cambio, tu dragón guardián te rodeará con un sentimiento muy cálido, ¡como si te diera un gran abrazo invisible! Desde ese momento serán inseparables."}
              </div>

              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">${isEn ? "Step 6:" : "Paso 6:"}</strong> ${isEn ? "Open your eyes gently, rest the palms of your hands upon the floor to ground any surplus energy, and thank your dragon friend for answering the call." : "Abrí los ojos lentamente, poné las palmas de tus manos en el suelo para soltar la energía sobrante y dale las gracias a tu nuevo compañero mágico por haber venido."}
              </div>
            </div>
          </div>

        </div>
      `;

    case 2:
      return `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Encabezado del Anillo 2 -->
          <div style="display: flex; align-items: center; gap: 14px; background: rgba(42,157,143,0.15); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--color-teal);">
            <span style="font-size: 2.8rem;">📜</span>
            <div>
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">${isEn ? "Level 2: The Dragon Enchanter" : "Nivel 2: El Encantador de Dragones"}</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                ${isEn 
                  ? "&quot;Congratulations on reaching the Second Ring! It is time to learn the ancient craft of spells, nature potions, and magical amulets.&quot;" 
                  : "&quot;¡Felicidades por avanzar al Segundo Anillo! Es hora de aprender el antiguo arte de los hechizos, las pociones de la naturaleza y los amuletos mágicos.&quot;"}
              </p>
            </div>
          </div>

          <!-- Código y Símbolos del Encantador -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">${isEn ? "🌿 The Enchanter's Code & Symbols" : "🌿 Tu Código y Símbolos de Encantador"}</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(233,196,106,0.08); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "📜 Your Magical Motto:" : "📜 Tu Lema Mágico:"}</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  ${isEn ? "&quot;Magic is both an art and a science. Always treat it with reverence.&quot;" : "&quot;La magia es tanto un arte como una ciencia. Trátala siempre con respeto.&quot;"}
                </p>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "As an Enchanter, you will learn to work with gifts of nature. Remember the supreme law: magic is invoked to aid, heal, and elevate—never to manipulate or control others. Dragons abhor tyrants and will never lend aid to anyone seeking dominion." 
                    : "Como Encantador, aprenderás a usar ingredientes de la naturaleza, pero recuerda la regla más grande: la magia se usa para ayudar, sanar y mejorar, ¡nunca para tratar de controlar a otras personas! A los dragones no les gustan los tiranos y no ayudarán a quien intente ser uno."}
                </p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                <div style="background: rgba(42,157,143,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--color-teal);">
                  <h5 style="color: var(--color-teal); margin: 0; font-size: 1.1rem;">${isEn ? "🟩 Your Color: Radiant Green" : "🟩 Tu Color: El Verde Brillante"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "Symbolizes the vigorous growth of living nature, prosperity, and radiant intent. Wear a bright green ribbon across your shoulders during your magical crafts." 
                      : "Representa el crecimiento de la naturaleza, la prosperidad y la magia positiva. Conseguí un listón verde y ponértelo en los hombros cada vez que vayas a trabajar en tus proyectos mágicos."}
                  </p>
                </div>

                <div style="background: rgba(200,85,61,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--color-rust);">
                  <h5 style="color: var(--color-rust); margin: 0; font-size: 1.1rem;">${isEn ? "🔺 Your Symbol: The Upward Triangle" : "🔺 Tu Símbolo: El Triángulo Ascendente"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "The triangle pointing toward the heavens. Inscribe it in your book of secrets to focus the elemental warmth of fire and conscious will." 
                      : "El triángulo apuntando hacia arriba. Podés dibujarlo en tu cuaderno de secretos para enfocar la fuerza del fuego y la mente."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tu Laboratorio Mágico: Nuevas Herramientas -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">${isEn ? "🧪 Your Magical Workshop: Crafting Tools" : "🧪 Tu Laboratorio Mágico: Nuevas Herramientas"}</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">
              ${isEn ? "To practice the art of an Enchanter, assemble your sacred toolkit:" : "Para hacer la magia de un Encantador, necesitarás reunir tu propio equipo de laboratorio:"}
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "✨ The Magic Wand" : "✨ La Varita Mágica"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "Your primary focus for projecting benevolent energy. Find a fallen branch worn by nature, or craft a smooth dowel adorned with a quartz crystal tip." 
                    : "Tu herramienta principal para dirigir buena energía. Podés buscar en el parque una rama caída que te guste, o usar un tubo transparente con piedritas de colores y un cristal de cuarzo en la punta."}
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🥣 Mortar & Glass Vials" : "🥣 El Mortero y Frasquitos"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "A small grinding bowl and clean glass jars with lids. Here you will carefully grind and preserve aromatic herbs and floral blossoms." 
                    : "Un mortero pequeño (un tazón grueso para machacar) y varios frasquitos vacíos limpios con tapa. Aquí guardarás y molerás tus hierbas mágicas."}
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🧵 Colorful Fabrics" : "🧵 Telas de Colores"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "Collect remnants of green, white, and red cotton fabric with ribbons to sew miniature charm bags and mojo pouches." 
                    : "Reuní pedacitos de tela (verde, blanca, roja) e hilos de colores. Te servirán para confeccionar pequeñas bolsitas mágicas."}
                </p>
              </div>
            </div>
          </div>

          <!-- Misión 1: Amuletos y Talismanes de Poder -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(233,196,106,0.08); border: 1px solid var(--gold-main);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">${isEn ? "✨ Quest 1: Amulets and Talismans of Might" : "✨ Misión 1: Amuletos y Talismanes de Poder"}</h4>
            <p style="margin-top: 6px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Did you know they are not the same? Understanding the difference will help you craft true tools of good fortune:" 
                : "¿Sabías que no son lo mismo? Conocer la diferencia te ayudará a crear tus propias herramientas de buena suerte:"}
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.05rem;">${isEn ? "🪨 Amulets (Gifts of Nature):" : "🪨 Los Amuletos (Naturaleza):"}</h5>
                <p style="margin-top: 6px; font-size: 0.9rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "Tokens shaped by nature itself: an intriguing river stone, a spiraled seashell, or an acorn (which shields you and imparts endurance). Simply discover and carry them." 
                    : "Son regalitos creados por la naturaleza, como una piedra con forma curiosa, una concha de mar o una bellota (que te protege y te da fuerza). Solo tenés que encontrarlos y llevarlos con vos."}
                </p>
              </div>
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.05rem;">${isEn ? "🎨 Talismans (Handcrafted Creations):" : "🎨 Los Talismanes (Creación Propia):"}</h5>
                <p style="margin-top: 6px; font-size: 0.9rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "Objects you fashion with your own hands. Craft a clay disc, inscribe your monogram or a dragon rune upon it, and hold it whenever you need courage!" 
                    : "Son objetos creados por vos. Podés hacer una pequeña moneda de arcilla, dibujarle tu inicial o un símbolo de dragón con marcador mágico, ¡y usarla para llenarte de valentía!"}
                </p>
              </div>
            </div>
          </div>

          <!-- Misión 2: Polvo de "Amistad de Dragón" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-teal); background: rgba(42,157,143,0.1);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.4rem;">${isEn ? "🌸 Quest 2: Dragon Friendship Dust" : "🌸 Misión 2: Polvo de &quot;Amistad de Dragón&quot;"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Learn to blend pure, gentle ritual powders using unscented talcum or baking soda as your base. In your mortar, gently blend it with dried fragrant rose petals or dried herbs." 
                : "Aprendé a hacer polvos mágicos inofensivos usando una base de talco sin aroma o bicarbonato. En tu tazón, mezclá el polvo con hojas secas de flores que huelan muy rico (como pétalos de rosa)."}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">${isEn ? "Blending Chanted Verse:" : "Conjuro de Mezcla:"}</strong>
              <p style="margin: 6px 0 0 0; font-style: italic; color: var(--text-gold); font-size: 0.95rem;">
                ${isEn 
                  ? "&quot;Dragons near and dragons far, join with me beneath each star. A happy heart I share with thee, when we meet and when we part in glee.&quot;" 
                  : "&quot;Llamo a los dragones, cerca y lejos, para que se unan a mí dondequiera que estén. Compartiré con ustedes un corazón feliz, cuando nos encontremos y cuando nos despidamos.&quot;"}
              </p>
            </div>
            <p style="margin-top: 10px; font-size: 0.9rem; color: var(--text-muted);">
              ${isEn 
                ? "Keep it in a small vial, and sprinkle a pinch near your altar space whenever you wish to invite young guardian dragons to play." 
                : "Guárdalo en tu frasco, y espolvoreá un poquito en tu cuarto cuando quieras invitar a los pequeños dragones guardianes a que te hagan compañía."}
            </p>
          </div>

          <!-- Misión 3: Pociones de "Agua de la Naturaleza" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-rust); background: rgba(200,85,61,0.1);">
            <h4 style="color: var(--color-rust); margin: 0; font-size: 1.4rem;">${isEn ? "💧 Quest 3: Potions of Living Nature Water" : "💧 Misión 3: Pociones de &quot;Agua de la Naturaleza&quot;"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Enchanters brew subtle infusions known as &quot;fluid condensers&quot; that absorb elemental vitality. With an adult's guidance, warm clean spring water and infuse it with fresh garden mint, lavender, or rose petals. Strain when cool and store in a glass flacon." 
                : "Los Encantadores preparan pociones de agua llamadas &quot;condensadores de fluidos&quot;, que sirven para atrapar la energía de los elementos. Pedile a un adulto que te ayude a calentar un poquito de agua pura y agrégale hojas frescas de tu jardín (como menta, rosas o lavanda). Déjala enfriar por completo, cuélala y guárdala en una botellita."}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">${isEn ? "Blessing Incantation:" : "Encantamiento de Cierre:"}</strong>
              <p style="margin: 6px 0 0 0; font-style: italic; color: var(--text-gold); font-size: 0.95rem;">
                ${isEn 
                  ? "&quot;Dragons of water, subtle and bold, bless this bottle that I hold. I trust your wisdom and your might, aiding my craft this sacred night.&quot;" 
                  : "&quot;Dragones de agua, sutiles pero audaces, energicen esta botella que sostengo. Confío en su sabiduría y en su poder, que me ayuda a hacer magia en esta hora.&quot;"}
              </p>
            </div>
            <p style="margin-top: 10px; font-size: 0.9rem; color: var(--text-muted);">
              ${isEn 
                ? "Dab a few drops of this herbal elixir onto your talismans to consecrate them with clear, uplifting energy." 
                : "Podés poner unas gotitas de esta agua mágica en tus amuletos para recargarlos de energía limpia y positiva."}
            </p>
          </div>

        </div>
      `;

    case 3:
      return `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Encabezado del Anillo 3 -->
          <div style="display: flex; align-items: center; gap: 14px; background: rgba(200,85,61,0.15); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--color-rust);">
            <span style="font-size: 2.8rem;">🌿</span>
            <div>
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">${isEn ? "Level 3: The Dragon Shaman (Energy Healer)" : "Nivel 3: El Chamán de Dragones (Sanador de Energía)"}</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                ${isEn 
                  ? "&quot;Splendid! You have attained the Third Ring. You step beyond simple charms to walk deeply with the spirit realm as a Walker Between Worlds.&quot;" 
                  : "&quot;¡Increíble! Has llegado al Tercer Anillo. Dejarás de ser un aprendiz para trabajar profundamente con el mundo espiritual y convertirte en un 'Caminante entre Mundos'.&quot;"}
              </p>
            </div>
          </div>

          <p style="line-height: 1.6; color: var(--text-main); font-size: 1.05rem;">
            ${isEn 
              ? "Shamans work alongside dragons to soothe emotional distress, heal energetic fatigue, and preserve the subtle balance of the living earth." 
              : "Los chamanes trabajan junto a los dragones para sanar la energía, calmar las emociones y mantener el equilibrio invisible de las cosas."}
          </p>

          <!-- Código y Símbolos de Chamán -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">${isEn ? "✨ The Shaman's Code & Symbols" : "✨ Tu Código y Símbolos de Chamán"}</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(233,196,106,0.08); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "📜 Your Magical Motto:" : "📜 Tu Lema Mágico:"}</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  ${isEn ? "&quot;To benefit all, I journey and learn throughout the Multiverse. I am a Walker Between Worlds.&quot;" : "&quot;Para beneficiar a todos, debo viajar y aprender en el Multiverso. Soy un Caminante entre Mundos.&quot;"}
                </p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                <div style="background: rgba(200,85,61,0.15); padding: 1rem; border-radius: 10px; border: 1px solid var(--color-rust);">
                  <h5 style="color: var(--color-rust); margin: 0; font-size: 1.1rem;">${isEn ? "🔴 Your Color: Radiant Crimson" : "🔴 Tu Color: El Rojo Brillante"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "Embodying action, vital vitality, and the potent current of healing. Adorn your shoulders with a scarlet ribbon when doing healing work." 
                      : "Este color representa la acción, el esfuerzo y el gran poder para sanar. Conseguí un listón rojo para ponerlo en tus hombros en tus prácticas."}
                  </p>
                </div>

                <div style="background: rgba(42,157,143,0.15); padding: 1rem; border-radius: 10px; border: 1px solid var(--color-teal);">
                  <h5 style="color: var(--color-teal); margin: 0; font-size: 1.1rem;">${isEn ? "🍃 Your Symbol: Leaf of the World Tree" : "🍃 Tu Símbolo: La Hoja Verde del Árbol del Mundo"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "A vibrant leaf representing Yggdrasil and universal renewal. Wear a leaf pin or sketch it upon your diary as your badge of initiation." 
                      : "Una hoja verde que representa el Árbol del Mundo y la naturaleza. Podés dibujarla o buscar un prendedor con esta forma para usarlo como tu medalla."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tus Herramientas de Sanación -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">${isEn ? "💎 Your Healing Mineral Allies" : "💎 Tus Herramientas de Sanación"}</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">
              ${isEn ? "A Shaman employs two complementary stones to balance living energy:" : "Un Chamán necesita piedras muy especiales (que podés buscar en el parque o en un río) para ayudar a los demás:"}
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🖤 The Absorbing Stone" : "🖤 La Piedra &quot;Aspiradora&quot;"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "A smooth black stone (such as obsidian, onyx, or river jet). Operates like an astral vacuum to draw away tension, grumpy moods, and heavy stagnant vibrations." 
                    : "Una piedra negra y de superficie suave (como el ónix o la obsidiana). Sirve como una aspiradora mágica para absorber y limpiar el mal humor, el estrés o la energía negativa del ambiente."}
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🤍 The Sealing Quartz" : "🤍 El Cristal Sellador"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "A white or clear quartz crystal applied right after the black stone to seal the cleansed aura with sparkling light and golden protection." 
                    : "Una piedra blanca (como el cuarzo nevado) que se usa inmediatamente después de la piedra negra, para 'sellar' y rellenar de luz y buena energía el espacio que limpiaste."}
                </p>
              </div>
            </div>
          </div>

          <!-- Misión 1: Sentir el Aura -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-teal); background: rgba(42,157,143,0.1);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.4rem;">${isEn ? "🖐️ Quest 1: Sensing the Aura (Your Invisible Field)" : "🖐️ Misión 1: Sentir el Aura (Tu Campo de Fuerza Invisible)"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Every person, animal, and living tree is enveloped by a luminous biometric field known as the <strong>Aura</strong>. Some perceive it as radiant colors, others as soft white radiance, and others simply feel its temperature and texture." 
                : "¿Sabías que todas las personas, animales e incluso las cosas están rodeados por un campo electromagnético invisible llamado <strong>Aura</strong>? Algunos magos la ven como luces de colores, otros como luz blanca, y otros simplemente la 'sienten'."}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">${isEn ? "How to Practice:" : "Cómo practicar:"}</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                ${isEn 
                  ? "Ask a trusted family member or friend to sit relaxed. With peaceful breathing, slowly sweep your open palms through the air roughly 15 cm from their shoulders, without physical touch. With patience, you will notice warmth, cool patches, or gentle tingling. Shamans use this skill to perceive where comforting energy is needed!" 
                  : "Pídele a un amigo o familiar que se siente tranquilo. Relajá tu mente y mové tus manos muy despacio en el aire, a unos 15 centímetros de su cuerpo, sin tocarlo en ningún momento. Con práctica, empezarás a 'sentir' el aura: podés notar lugares que se sienten más fríos, más calientes, o un leve cosquilleo. ¡Los chamanes usan este ejercicio para descubrir dónde necesita una persona un abrazo de energía mágica!"}
              </p>
            </div>
          </div>

          <!-- Misión 3: El Sonido que Cura -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-rust); background: rgba(200,85,61,0.1);">
            <h4 style="color: var(--color-rust); margin: 0; font-size: 1.4rem;">${isEn ? "🎵 Quest 2: The Healing Dragon Resonance" : "🎵 Misión 2: El Sonido que Cura"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Shamans discovered that the vibration of sound and voice acts as a direct balm for troubled spirits." 
                : "Los chamanes descubrieron que la vibración de la voz es una gran herramienta de sanación."}
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 10px;">
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--color-teal);">${isEn ? "🌬️ Tone &quot;AAHH&quot; (Soothing Relaxation):" : "🌬️ Sonido &quot;AAHH&quot; (Relajación):"}</strong>
                <p style="margin-top: 4px; font-size: 0.9rem; color: var(--text-main);">
                  ${isEn 
                    ? "When feeling weary or upset, gently intone a sustained, soft <em>&quot;aahh&quot;</em> sound. It dissolves worry and unties mental knots." 
                    : "Si tú o alguien de tu familia se siente cansado, cantá en voz alta y suavemente el sonido <em>&quot;aahh&quot;</em>, que ayuda a sanar y relajar la mente y el cuerpo."}
                </p>
              </div>
              <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px;">
                <strong style="color: var(--gold-main);">${isEn ? "⚡ Tone &quot;EEEE&quot; (Vital Awakening):" : "⚡ Sonido &quot;EEEE&quot; (Energización):"}</strong>
                <p style="margin-top: 4px; font-size: 0.9rem; color: var(--text-main);">
                  ${isEn 
                    ? "When you need to awaken resolve and banish sluggishness, softly hum the crisp <em>&quot;eeee&quot;</em> sound while holding your healing stones." 
                    : "Si lo que necesitan es despertar y llenarse de energía positiva, el sonido mágico es <em>&quot;eeee&quot;</em>. ¡Pruébalo mientras sostienes tus piedras curativas en las manos!"}
                </p>
              </div>
            </div>
          </div>

        </div>
      `;

    case 4:
      return `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Encabezado del Anillo 4 -->
          <div style="display: flex; align-items: center; gap: 14px; background: rgba(233,196,106,0.15); padding: 1.2rem; border-radius: 14px; border: 1px solid var(--gold-main);">
            <span style="font-size: 2.8rem;">🛡️</span>
            <div>
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">${isEn ? "Level 4: The Dragon Warrior (Valiant Guardian)" : "Nivel 4: El Guerrero Dragón (El Protector Valiente)"}</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                ${isEn 
                  ? "&quot;Welcome to the Fourth Ring! A Dragon Warrior never raises fists! A warrior uses luminous confidence, energetic shields, and keen wit to triumph over discord.&quot;" 
                  : "&quot;¡Bienvenido al Cuarto Anillo! ¡Un Guerrero Dragón no usa los puños! Usa su súper confianza, escudos de energía e inteligencia para triunfar sobre cualquier problema.&quot;"}
              </p>
            </div>
          </div>

          <!-- Código y Símbolos de Guerrero -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">${isEn ? "✨ The Warrior's Code & Symbols" : "✨ Tu Código y Símbolos de Guerrero"}</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(233,196,106,0.08); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "📜 Your Magical Motto:" : "📜 Tu Lema Mágico:"}</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  ${isEn 
                    ? "&quot;I stand for truth, protect my inner spark, and seek no quarreling where none exists. Common sense is my armor!&quot;" 
                    : "&quot;Defiendo la verdad, protejo mi energía y nunca busco problemas donde no los hay. ¡Uso mi sentido común!&quot;"}
                </p>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "The true power of a warrior lies in knowing when to step aside with dignity and preserve unshakable peace." 
                    : "El verdadero poder de un guerrero es saber cuándo alejarse de una pelea y mantenerse tranquilo."}
                </p>
              </div>

              <div style="background: rgba(233,196,106,0.12); padding: 1rem; border-radius: 10px; border: 1px solid var(--gold-main);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🟡 Your Color: Brilliant Gold or Solar Amber" : "🟡 Tu Color: El Dorado o Amarillo Brillante"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "The radiance of strength and unbreachable psychic safety. Wear a golden ribbon during your courage rituals." 
                    : "El color de la fuerza y la protección invencible. Podés conseguir un listón de este color para usarlo en tus meditaciones de fortaleza."}
                </p>
              </div>
            </div>
          </div>

          <!-- Tus Herramientas de Defensa -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.3rem;">${isEn ? "🛡️ Your Shields of Defense" : "🛡️ Tus Herramientas de Defensa"}</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">
              ${isEn ? "A Dragon Warrior relies on two steadfast emotional shields:" : "Un Guerrero Dragón cuenta con dos poderosos escudos emocionales:"}
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🔮 1. The Mirror of Deflection" : "🔮 1. El Espejo Brillante"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "A pocket mirror used to deflect harsh energy or mean remarks back into the universe without harboring bitterness." 
                    : "Un espejo pequeño que usarás para 'rebotar' las malas energías o las palabras feas sin guardarte rencor."}
                </p>
              </div>

              <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 10px; border: 1px solid var(--border-panel);">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🌿 2. The Staff of Balance" : "🌿 2. El Bastón de Equilibrio"}</h5>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "A sturdy wooden staff that steadies your heart and reminds you to stand rooted whenever challenges arise." 
                    : "Una vara larga de madera (puedes buscar una rama firme en el parque). Sirve para mantener tu equilibrio emocional cuando sientes que te vas a caer o a rendir."}
                </p>
              </div>
            </div>
          </div>

          <!-- Misión 1: El Hechizo del "Espejo Rebotador" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--gold-main); background: rgba(233,196,106,0.08);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.4rem;">${isEn ? "🔮 Quest 1: The Mirror Deflection Ward" : "🔮 Misión 1: El Hechizo del &quot;Espejo Rebotador&quot;"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Sometimes at school or on the street, you may encounter grumpy spirits or unkind words. Never let them stick to your heart!" 
                : "A veces, en la escuela o en la calle, te puedes encontrar con personas que están de muy mal humor o que dicen cosas hirientes (a esto le llamamos 'energía dañina'). ¡No dejes que se pegue a vos!"}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">${isEn ? "Your Warrior Practice:" : "Tu tarea de Guerrero:"}</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                ${isEn 
                  ? "Hold your mirror facing outward toward the world. Envision your guardian dragon gazing through the glass with benevolent fire, and chant:" 
                  : "Toma tu Espejo Brillante y sostenlo frente a vos con la parte que refleja apuntando hacia afuera (hacia el mundo). Imagina que tu dragón guardián está proyectando su imagen en ese espejo para protegerte. Luego, repite este conjuro especial:"}
              </p>
              <p style="margin: 8px 0 0 0; font-style: italic; color: var(--text-gold); background: rgba(233,196,106,0.1); padding: 10px; border-radius: 8px;">
                ${isEn 
                  ? "&quot;In this mirror bright and clear, dragon courage leaves no fear. Safe and peaceful I remain, return discordant thoughts again!&quot;" 
                  : "&quot;En este espejo brillante y protector, un gran dragón refleja su valor. Me quedo aquí seguro y sin temor, ¡que la mala energía se aleje a su creador!&quot;"}
              </p>
              <p style="margin-top: 8px; font-size: 0.9rem; color: var(--text-muted);">
                ${isEn 
                  ? "Afterward, rinse the mirror under cool water to wash away whatever heavy feelings were neutralized." 
                  : "Después, lava tu espejo con un poco de agua para limpiarlo de cualquier mala vibra que haya atrapado."}
              </p>
            </div>
          </div>

          <!-- Misión 2: Caminar con la Confianza del Dragón -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-teal); background: rgba(42,157,143,0.1);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.4rem;">${isEn ? "🐉 Quest 2: Walking with Dragon Confidence" : "🐉 Misión 2: Caminar con la Confianza del Dragón"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "The greatest secret of Dragon Warriors is their unshakeable inner self-trust, enabling them to meet every challenge with grace." 
                : "El secreto más grande de los Guerreros Dragón es que desarrollan una confianza en sí mismos tan gigante que los ayuda a superar cualquier cosa."}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--color-teal);">${isEn ? "Your Attitude Quest:" : "Tu tarea de Actitud:"}</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                ${isEn 
                  ? "Whenever nervous before a speech or test, grip your Staff of Balance. Stand tall, inhale deeply, and picture majestic dragon wings unfurling behind your shoulders. Walk with calm majesty. Every obstacle shrinks before such courage!" 
                  : "La próxima vez que te sientas nervioso (antes de un examen o de hablar en público), toma tu Bastón de Equilibrio con fuerza. Párate muy derecho, respira hondo e imagina que unas enormes alas de dragón se abren a tus espaldas. Camina sintiendo que eres invencible. ¡Esa actitud hará que cualquier obstáculo parezca diminuto!"}
              </p>
            </div>
          </div>

          <!-- Misión 3: La Regla del "No-Problema" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--color-rust); background: rgba(200,85,61,0.1);">
            <h4 style="color: var(--color-rust); margin: 0; font-size: 1.4rem;">${isEn ? "📜 Quest 3: The Golden Rule of Non-Conflict" : "📜 Misión 3: La Regla del &quot;No-Problema&quot;"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "To be a warrior means bearing great capability, and true capability demands wise restraint." 
                : "Ser un guerrero significa tener mucho poder, y tener poder significa ser muy responsable."}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--color-rust);">${isEn ? "Ring Pledge:" : "Promesa del Anillo:"}</strong>
              <p style="margin-top: 6px; font-style: italic; color: var(--text-gold); font-size: 1rem;">
                ${isEn ? "&quot;Do not breed trouble where none exists.&quot;" : "&quot;No hagas problemas donde no los hay.&quot;"}
              </p>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                ${isEn 
                  ? "If a pointless argument begins, be the wisest person in the room and walk away. A true warrior maintains an open heart but guards their peace!" 
                  : "Si ves que una discusión está a punto de empezar, sé el más inteligente de la habitación y aléjate. Un guerrero siempre tiene la mente abierta, ¡pero usa su sentido común para mantenerse a salvo!"}
              </p>
            </div>
          </div>

        </div>
      `;

    case 5:
    default:
      return `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Encabezado del Anillo 5 -->
          <div style="display: flex; align-items: center; gap: 14px; background: linear-gradient(135deg, rgba(138,43,226,0.2), rgba(233,196,106,0.15)); padding: 1.2rem; border-radius: 14px; border: 1px solid #8a2be2;">
            <span style="font-size: 2.8rem;">🔮</span>
            <div>
              <h3 style="color: var(--gold-main); margin: 0; font-size: 1.7rem;">${isEn ? "Level 5: The Mystic Dragon (Master of the Cosmic Web)" : "Nivel 5: El Místico Dragón (Maestro de la Red de la Vida)"}</h3>
              <p style="color: var(--text-gold); font-style: italic; margin: 4px 0 0 0; font-size: 1.05rem;">
                ${isEn 
                  ? "&quot;Congratulations, noble wizard! You have arrived at the Fifth Ring, the highest pinnacle. You stand as a guardian of nature and the cosmos.&quot;" 
                  : "&quot;¡Felicidades, joven mago! Has llegado al Quinto Anillo, el último y más alto nivel. Te conviertes en un guardián de la naturaleza y del universo.&quot;"}
              </p>
            </div>
          </div>

          <!-- Código y Símbolos de Místico -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3);">
            <h4 style="color: var(--gold-main); margin: 0 0 10px 0; font-size: 1.3rem;">${isEn ? "✨ The Mystic's Code & Symbols" : "✨ Tu Código y Símbolos de Místico"}</h4>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
              <div style="background: rgba(138,43,226,0.1); padding: 1rem; border-radius: 10px; border-left: 4px solid #8a2be2;">
                <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "📜 Your Magical Motto:" : "📜 Tu Lema Mágico:"}</h5>
                <p style="margin-top: 4px; font-style: italic; color: var(--text-gold); font-size: 1rem; font-weight: 600;">
                  ${isEn 
                    ? "&quot;We are all strands in the Web of Life. All things, animate and inanimate, are woven as one.&quot;" 
                    : "&quot;Todos somos parte de la Red de la Vida. Todas las cosas, animadas e inanimadas, están conectadas.&quot;"}
                </p>
                <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                  ${isEn 
                    ? "Every word, intention, and deed is like a pebble dropped into clear water: ripples travel onward and touch all living beings around you!" 
                    : "Esto significa que todo lo que haces, dices o piensas es como lanzar una piedrita en un estanque: ¡crea ondas que viajan y tocan todo a tu alrededor!"}
                </p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                <div style="background: rgba(138,43,226,0.15); padding: 1rem; border-radius: 10px; border: 1px solid #8a2be2;">
                  <h5 style="color: #b19ffb; margin: 0; font-size: 1.1rem;">${isEn ? "🟣 Your Color: Royal Violet or Starlit Silver" : "🟣 Tu Color: El Violeta o Gris Plateado"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "The hues of celestial nebulas, starlight, and boundless wisdom. Wear this ribbon with honor at your graduation." 
                      : "Los colores del universo, de las estrellas y de la magia más profunda. Conseguí un listón de este color para celebrar tu gran graduación."}
                  </p>
                </div>

                <div style="background: rgba(233,196,106,0.1); padding: 1rem; border-radius: 10px; border: 1px solid var(--gold-main);">
                  <h5 style="color: var(--gold-main); margin: 0; font-size: 1.1rem;">${isEn ? "🌠 Your Symbol: The Shooting Star" : "🌠 Tu Símbolo: La Estrella Fugaz"}</h5>
                  <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                    ${isEn 
                      ? "The nine-pointed star or shooting comet, embodying an eternal pilgrimage of discovery, wonder, and illumination." 
                      : "La estrella fugaz (o estrella de 9 puntas). Representa un viaje lleno de sorpresas maravillosas, sabiduría e iluminación."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- El Secreto Supremo: El Elemento Tormenta -->
          <div class="fantasy-panel" style="padding: 1.4rem; background: rgba(0,0,0,0.3); border: 1px solid var(--color-teal);">
            <h4 style="color: var(--color-teal); margin: 0; font-size: 1.3rem;">${isEn ? "⚡ The Supreme Mystery: The Storm Element" : "⚡ El Secreto Supremo: El Elemento Tormenta"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "While earlier stages work with Air, Fire, Water, and Earth, the Mystic embraces the mysterious <strong>Storm Element</strong>. Storms bring profound renewal, and a Mystic welcomes change as the wind beneath dragon wings!" 
                : "Mientras que otros niveles trabajan con el Aire, Fuego, Agua y Tierra, el Místico trabaja con el misterioso <strong>elemento de la Tormenta</strong>. Las tormentas traen cambios, y un Místico sabe que cambiar y crecer es parte de la vida. ¡Un Místico no le teme a los cambios, los usa para volar más alto!"}
            </p>
          </div>

          <!-- Misión 1: Sentir la "Red de la Vida" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid #8a2be2; background: rgba(138,43,226,0.1);">
            <h4 style="color: #b19ffb; margin: 0; font-size: 1.4rem;">${isEn ? "🌱 Quest 1: Feeling the Web of Life" : "🌱 Misión 1: Sentir la &quot;Red de la Vida&quot;"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Step out into a garden, park, or stand before your favorite houseplant for this communion." 
                : "Para esta misión, sal a un parque, a tu jardín o siéntate junto a tu planta favorita."}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">${isEn ? "Your Connection Practice:" : "Tu tarea de Conexión:"}</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                ${isEn 
                  ? "Touch tree bark or fresh leaves gently. Close your eyes and visualize a thread of luminous light flowing from your heart to the tree. Trace that thread as it reaches flying birds, clouds, loved ones, and distant constellations. Feel the embrace of the whole living cosmos. You are never alone—you are part of everything!" 
                  : "Toca suavemente la corteza de un árbol o las hojas de una planta. Cierra los ojos e imagina que un hilo de luz brillante y muy delgadito sale de tu corazón y se conecta con el árbol. Luego, imagina que ese hilo se conecta con los pajaritos, con las nubes, con tu familia y con las estrellas. Siente cómo la energía de todo el universo te abraza. ¡Nunca estás solo, porque estás conectado con todo lo que existe!"}
              </p>
            </div>
          </div>

          <!-- Misión 2: Despertar tu "Corazón de Dragón Oculto" -->
          <div class="fantasy-panel" style="padding: 1.5rem; border: 2px solid var(--gold-main); background: rgba(233,196,106,0.08);">
            <h4 style="color: var(--gold-main); margin: 0; font-size: 1.4rem;">${isEn ? "💖 Quest 2: Awakening Your Hidden Dragon Heart" : "💖 Misión 2: Despertar tu &quot;Corazón de Dragón Oculto&quot;"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">
              ${isEn 
                ? "Ancient dragon masters teach that deep within your consciousness rests an invaluable treasure: your <strong>Hidden Dragon Heart</strong>." 
                : "Los maestros draconianos enseñan que muy en el fondo de tu mente (justo detrás de tus ojos) se esconde un tesoro invaluable: tu <strong>Corazón de Dragón Oculto</strong>."}
            </p>
            <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 10px; margin-top: 10px;">
              <strong style="color: var(--gold-main);">${isEn ? "Your Illumination Quest:" : "Tu tarea de Iluminación:"}</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                ${isEn 
                  ? "Sit quietly, breathe deeply, and picture a small radiant violet sun glowing behind your eyes. That is your Dragon Heart—the seat of calm, bravery, and insight. Whenever faced with uncertainty or sadness, close your eyes and commune with this radiant spark. It will show you the noble path!" 
                  : "Siéntate en silencio, respira profundo y visualiza que dentro de tu cabeza hay un pequeño sol brillante de color violeta. Ese es tu Corazón de Dragón. Es el lugar donde guardas toda tu valentía, tu paz y tu inteligencia. Cuando te sientas triste, asustado o no sepas qué hacer, solo cierra los ojos, respira y conéctate con esta luz. ¡Te dará la respuesta correcta!"}
              </p>
            </div>
          </div>

          <!-- Misión 3: El Gran Viaje (Tu Graduación) -->
          <div class="fantasy-panel text-center" style="padding: 1.8rem; border: 2px solid var(--gold-main); background: linear-gradient(135deg, rgba(233,196,106,0.15), rgba(138,43,226,0.2)); border-radius: 18px;">
            <div style="font-size: 3rem;">🎓</div>
            <h4 style="color: var(--gold-main); margin: 6px 0 0 0; font-size: 1.6rem;">${isEn ? "🎓 Quest 3: The Grand Journey (Your Graduation)" : "🎓 Misión 3: El Gran Viaje (Tu Graduación)"}</h4>
            <p style="margin-top: 8px; color: var(--text-main); line-height: 1.6; font-size: 1rem; max-width: 700px; margin: 8px auto 0 auto;">
              ${isEn 
                ? "The quest of a Mystic Dragon never truly ends, for there are ever new wonders to explore and understand in the boundless universe." 
                : "El viaje de un Místico nunca termina realmente, porque siempre hay cosas nuevas y emocionantes por descubrir y aprender en el universo."}
            </p>
            <div style="background: rgba(0,0,0,0.5); padding: 1.2rem; border-radius: 12px; margin-top: 1.2rem; text-align: left;">
              <strong style="color: var(--gold-main);">${isEn ? "Your Graduation Oath:" : "Tu Juramento de Graduación:"}</strong>
              <p style="margin-top: 6px; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                ${isEn 
                  ? "Open your Dragon Secrets Journal and draw a grand shooting star upon the final leaf. Inscribe beneath:" 
                  : "Toma tu 'Diario de Secretos del Dragón' (tu cuaderno mágico) y dibuja una estrella fugaz grande en la última página. Escribí debajo:"}
              </p>
              <p style="margin: 8px 0 0 0; font-style: italic; color: var(--text-gold); background: rgba(233,196,106,0.1); padding: 10px; border-radius: 8px; font-weight: 700; text-align: center;">
                ${isEn 
                  ? "&quot;I vow to use my magic to uplift the world and continue learning each and every day.&quot;" 
                  : "&quot;Prometo usar mi magia para ayudar al mundo y seguir aprendiendo todos los días.&quot;"}
              </p>
              <p style="margin-top: 10px; font-size: 0.9rem; color: var(--text-muted); text-align: center;">
                ${isEn 
                  ? "Seal with your Magical Name and celebrate joyfully with your Guardian Dragon! 🎉🐉✨" 
                  : "¡Firma con tu Nombre Mágico y celebra con tu Dragón Guardián! 🎉🐉✨"}
              </p>
            </div>
          </div>

        </div>
      `;
  }
}
