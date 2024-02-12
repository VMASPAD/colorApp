import { Button, Modal, NumberInput } from 'keep-react'
import '../assets/index.css'
import React, { useState } from 'react'
import { CopyIcon, HeartFilledIcon } from '@radix-ui/react-icons'
function Colors() {
  const [value, setValue] = useState(2)

  const [selectedColor, setSelectedColor] = useState('#ff0000')
  const [selectedColorSecond, setSelectedColorSecond] = useState('#ff0000')

  const handleColorChange = (event) => {
    const newColor = event.target.value
    setSelectedColor(newColor)
  }
  const handleColorChangeSecond = (event) => {
    const newColor = event.target.value
    setSelectedColorSecond(newColor)
  }

  // Función para convertir color hexadecimal a RGB
  const hexToRgb = (hex) => {
    // Elimina el signo '#' si está presente
    hex = hex.replace(/^#/, '')

    // Convierte pares de caracteres hexadecimales a valores decimales
    const bigint = parseInt(hex, 16)

    // Extrae los componentes RGB
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    // Devuelve el resultado en formato RGB
    return `rgb(${r}, ${g}, ${b})`
  }
  const hexToRgbSecond = (hex) => {
    // Elimina el signo '#' si está presente
    hex = hex.replace(/^#/, '')

    // Convierte pares de caracteres hexadecimales a valores decimales
    const bigint = parseInt(hex, 16)

    // Extrae los componentes RGB
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    // Devuelve el resultado en formato RGB
    return `rgb(${r}, ${g}, ${b})`
  }
  // Convierte el color hexadecimal a RGB
  const rgbColor = hexToRgb(selectedColor)
  const rgbColorSecond = hexToRgbSecond(selectedColorSecond)
  const gridStyle = {
    gridTemplateColumns: `repeat(${value}, 1fr)` // Establece el número de columnas
  }
  const match = rgbColor.match(/\d+/g)
  const matchSecond = rgbColorSecond.match(/\d+/g)

  // Convertir valores a números
  const startColor = match ? match.map(Number) : null
  const endColor = matchSecond ? matchSecond.map(Number) : null

  console.log(selectedColor, selectedColorSecond)

  const generateGradientColors = (startColor, endColor, steps) => {
    if (!startColor || !endColor) {
      return []
    }

    const delta = [
      (endColor[0] - startColor[0]) / (steps - 1),
      (endColor[1] - startColor[1]) / (steps - 1),
      (endColor[2] - startColor[2]) / (steps - 1)
    ]
    const gradientColors = Array.from({ length: steps }, (_, index) => {
      const r = Math.round(startColor[0] + delta[0] * index)
      const g = Math.round(startColor[1] + delta[1] * index)
      const b = Math.round(startColor[2] + delta[2] * index)
      var luminancia = 0.299 * r + 0.587 * g + 0.114 * b
      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
        .toString(16)
        .padStart(2, '0')}`

      const calculateHSB = (r, g, b) => {
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const delta = max - min

        let h = 0
        let s = max === 0 ? 0 : delta / max
        let v = max

        if (delta !== 0) {
          if (max === r) h = (g - b) / delta + (g < b ? 6 : 0)
          else if (max === g) h = (b - r) / delta + 2
          else if (max === b) h = (r - g) / delta + 4

          h *= 60
        }

        return [Math.round(h), Math.round(s * 100), Math.round(v * 100)]
      }
      const calculateHSL = (r, g, b) => {
        r /= 255
        g /= 255
        b /= 255

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const delta = max - min

        let h = 0
        let s = 0
        let l = (max + min) / 2

        if (delta !== 0) {
          s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

          if (max === r) h = (g - b) / delta + (g < b ? 6 : 0)
          else if (max === g) h = (b - r) / delta + 2
          else if (max === b) h = (r - g) / delta + 4

          h *= 60
        }

        return [Math.round(h), Math.round(s * 100), Math.round(l * 100)]
      }
      const calculateCMYK = (r, g, b) => {
        const c = 1 - r / 255
        const m = 1 - g / 255
        const y = 1 - b / 255
        const k = Math.min(c, m, y)

        return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)]
      }
      const calculateLAB = (r, g, b) => {
        r /= 255
        g /= 255
        b /= 255

        // SRGB to XYZ
        const x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b
        const y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b
        const z = 0.0193339 * r + 0.119192 * g + 0.9503041 * b

        // XYZ to LAB
        const epsilon = 0.008856
        const kappa = 903.3

        const xR = x / 0.95047
        const yR = y / 1.0
        const zR = z / 1.08883

        const f = (c) => (c > epsilon ? Math.pow(c, 1 / 3) : (kappa * c + 16) / 116)

        const l = 116 * f(yR) - 16
        const a = (xR - yR) * 500
        const bb = (yR - zR) * 200

        return [Math.round(l), Math.round(a), Math.round(bb)]
      }
      const valorColors = {
        rgb: `rgb(${r}, ${g}, ${b})`,
        hex: hex,
        hsb: calculateHSB(r, g, b),
        hsl: calculateHSL(r, g, b),
        cmyk: calculateCMYK(r, g, b),
        lab: calculateLAB(r, g, b),
        potencialColor: luminancia
      }
      return valorColors
    })

    return gradientColors
  }

  const gradientColors = generateGradientColors(startColor, endColor, value)
  localStorage.setItem('dbColors', JSON.stringify(gradientColors))
  console.log(gradientColors)
  const copiarTexto = (color) => {
    // Crear un elemento de textarea para almacenar el texto que se copiará
    const elementoTemporal = document.createElement('textarea')
    elementoTemporal.value = color
    console.log(color)
    document.body.appendChild(elementoTemporal)

    // Seleccionar y copiar el texto
    elementoTemporal.select()
    document.execCommand('copy')

    // Eliminar el elemento temporal
    document.body.removeChild(elementoTemporal)
  }
  const [selectedModalIndex, setSelectedModalIndex] = useState(null)

  const onClickOne = (index) => {
    setSelectedModalIndex(index === selectedModalIndex ? null : index)
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center mb-5 gap-10">
        <NumberInput sizing="md" value={value} setValue={setValue} />
        <input
          type="color"
          id="colorSelector"
          name="colorSelector"
          value={selectedColor}
          onChange={handleColorChange}
        />
        <input
          type="color"
          id="colorSelectorSecond"
          name="colorSelectorSecond"
          value={selectedColorSecond}
          onChange={handleColorChangeSecond}
        />
        <span>
          Color actual: {rgbColor} {rgbColorSecond}
        </span>
      </div>
      <div className={`w-auto grid grid-cols-${value} h-screen`} style={gridStyle}>
        {gradientColors.map((color, index) => (
          <>
            <React.Fragment key={index}>
              <Modal
                size="md"
                show={selectedModalIndex === index}
                position="center"
                icon={<HeartFilledIcon size={28} color={color.hex} />}
              >
                <Modal.Header>{color.hex}</Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <p className="text-body-5 md:text-body-4 leading-relaxed text-metal-500">
                      CMYK: {color.cmyk}
                    </p>
                    <p className="text-body-5 md:text-body-4 leading-relaxed text-metal-500">
                      HEX: {color.hex}
                    </p>
                    <p className="text-body-5 md:text-body-4 leading-relaxed text-metal-500">
                      HSB: {color.hsb}
                    </p>
                    <p className="text-body-5 md:text-body-4 leading-relaxed text-metal-500">
                      HSL: {color.hsl}
                    </p>
                    <p className="text-body-5 md:text-body-4 leading-relaxed text-metal-500">
                      LAB: {color.lab}
                    </p>
                    <p className="text-body-5 md:text-body-4 leading-relaxed text-metal-500">
                      Color Potencial: {color.potencialColor}
                    </p>
                    <p className="text-body-5 md:text-body-4 leading-relaxed text-metal-500">
                      RGB: {color.rgb}
                    </p>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button type="outlineGray" onClick={onClickOne}>
                    Cerrar
                  </Button>
                </Modal.Footer>
              </Modal>
              <div
                onClick={() => onClickOne(index)}
                key={index}
                style={{
                  backgroundColor: color.rgb,
                  height: '100vh',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 900
                }}
                className="flex items-center flex-col content-center justify-center gap-10"
              >
                <button onClick={() => copiarTexto(color.rgb)}>
                  <CopyIcon />
                </button>
                <p style={{ color: color.potencialColor < 75 ? 'white' : 'black' }}>{color.rgb}</p>
                <p style={{ color: color.potencialColor < 75 ? 'white' : 'black' }}>{color.hex}</p>
              </div>
            </React.Fragment>
          </>
        ))}
      </div>
    </>
  )
}

export default Colors
