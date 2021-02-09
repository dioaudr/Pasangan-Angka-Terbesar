/*
========================================================================================================
ABAIKAN BLOCK CODE INI
========================================================================================================
*/
const Restriction = require('hacktiv8-restriction')
const { execSync } = require('child_process')
const fs = require('fs')
const checkRestriction = require('hacktiv8-restriction')
const solutionPath = '../index.js'

const reconstructedFilename = 'reconstructed.js'

const pasanganAngka = (number) => {
  let solution = fs.readFileSync('./index.js', 'utf-8')

  let countToString = solution.indexOf('.toString()') + solution.indexOf('String(') + solution.indexOf('+ \'\'') + solution.indexOf('+ \"\"') + solution.indexOf('+ \`\`')
  let countToNumber = solution.indexOf('parseFloat(') +solution.indexOf('parseInt(') + solution.indexOf('Number(')
  solution = solution.replace(/(let|var) angka .*/, `$1 angka = ${number}`)

  fs.writeFileSync(reconstructedFilename, solution)

  return {countToString, countToNumber, log: String(execSync(`node ${reconstructedFilename}`))}
}

afterAll(() => {
  if (fs.existsSync(reconstructedFilename)) {
    fs.unlinkSync(reconstructedFilename)
  }
})
/*
========================================================================================================
ABAIKAN BLOCK CODE INI
========================================================================================================
*/

/*
========================================================================================================
PASTIKAN SOLUSI YANG DITULIS SESUAI DENGAN SKENARIO DIBAWAH INI
========================================================================================================
*/
describe('Pasangan Angka Terbesar', () => {
  it('should correctly retured toString(), String() etc (10)', () => {
    const result = pasanganAngka(123)
    expect(result.countToString > 0).toBe(true)
    expect(result.countToNumber > 0).toBe(true)
  })
  it('should match with requirements (90)', () => {
    const result1 = pasanganAngka(12).log
    const result2 = pasanganAngka(90).log
    const result3 = pasanganAngka(12121212).log
    const result4 = pasanganAngka(9089).log
    const result5 = pasanganAngka(908910091981).log
    expect(result5).toMatch('98')
    expect(result4).toMatch('90')
    expect(result3).toMatch('21')
    expect(result2).toMatch('90')
    expect(result1).toMatch('12')
  })
  it('should check restriction rules (-30)', async () => {
    const checkRestriction = new Restriction('../index.js');
    checkRestriction.rules = ['match', 'split', 'concat', 'pop', 'push', 'unshift', 'shift'];
    const restrictedUse = await checkRestriction.readCode();
    expect(restrictedUse).toBe(null);
  });
})
