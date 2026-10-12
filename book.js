/* Original study explanations, organized from the user's Palermo course notes. */
globalThis.BOOK = [
  {
    id: 'purpose', part: 'Getting comfortable', title: 'Secrets, messages & mistakes', minutes: 8,
    subtitle: 'Two different problems. Two powerful ideas.', source: 'Cryptography notes §1; Coding Theory — Introduction',
    goal: 'Tell apart encryption, encoding, and error correction.',
    sections: [
      ['Start with a message', 'Imagine sending “Meet at noon” to a friend. The readable message is the <b>plaintext</b>. Encryption changes it into a scrambled message, the <b>ciphertext</b>. A <b>key</b> is a secret value that controls that change. Decryption uses the right key to recover the message. A <b>cipher</b> is the rule used for encryption and decryption.'],
      ['Keep a secret, or fix a mistake?', '<b>Cryptography</b> studies how to protect information. Encryption mainly aims at <b>confidentiality</b>: keeping a message private. <b>Coding theory</b> studies ways to represent data so transmission or storage mistakes can be detected or corrected. A code adds carefully chosen extra symbols, called <b>redundancy</b>. These extra symbols do not automatically make the message secret.'],
      ['Three words that sound similar', '<b>Encoding</b> changes the representation of data, such as a letter into bits. <b>Encryption</b> protects the meaning using a key. <b>Steganography</b> hides the existence of a message, such as placing it inside an image. Knowing an encoding rule usually lets anyone read the result; knowing a cipher rule should not reveal a properly protected secret key.'],
      ['What does “secure” mean?', 'A secure design makes the attacker’s task impractical under stated assumptions. It also needs <b>integrity</b> (detecting changes) and often <b>authentication</b> (checking who sent something). Encryption alone does not guarantee either. The small numbers in this book make the maths visible; they are classroom examples.']
    ],
    formula: 'c = Eₖ(m)     m = Dₖ(c)',
    legend: [['m', 'The original message (plaintext).'], ['c', 'The scrambled message (ciphertext).'], ['k', 'The key. The small subscript says which key is used.'], ['Eₖ / Dₖ', 'Encrypt / decrypt using key k.'], ['=', 'The expression on each side has the same value.']],
    example: {title: 'Repeating a bit to survive a mistake', steps: ['The original bit is 1. Encode it as 111: three copies.', 'The channel accidentally changes the middle bit. You receive 101.', 'Two of the three bits are 1. Majority voting recovers the original 1.', 'This can correct one changed bit, but anyone can still read it. It provides error correction, not secrecy.']},
    check: {prompt: 'Sending 1 as 111, then recovering it from 101, mainly provides…', options: ['Error correction', 'Confidentiality', 'A digital signature'], answer: 0, hint: 'Ask whether the receiver is repairing damage or hiding meaning.', explanation: 'Error correction repairs a transmission mistake. Repeating a visible bit does not keep it secret.'},
    takeaway: 'Encryption protects meaning. Error-correcting codes protect data from mistakes.'
  },
  {
    id: 'maths', part: 'Getting comfortable', title: 'Reading the language of maths', minutes: 10,
    subtitle: 'Symbols are short sentences, not a new language to fear.', source: 'Added foundation for the algebra in cryptography notes §3',
    goal: 'Read sets, powers, functions, and simple sums without guessing.',
    sections: [
      ['Numbers, sets & variables', 'An <b>integer</b> is a whole number, possibly negative: −2, −1, 0, 1, 2. The symbol ℤ means the set of all integers. A <b>set</b> is a collection, such as A = {0, 1}. A <b>variable</b>, such as x, is a name for a value. In x + 2 = 5, x must be 3.'],
      ['Multiplication and powers', 'ab means a × b. A <b>power</b> means repeated multiplication: 2³ = 2 × 2 × 2 = 8. The base is 2; the exponent is 3. For a nonzero a, a⁰ = 1. Parentheses tell you what to calculate together: (2 + 3)² = 25, while 2 + 3² = 11.'],
      ['Functions and sums', 'A <b>function</b> is a rule with one output for each permitted input. If f(x) = x + 3, then f(2) = 5. The notation Σ means add several terms; Σ from i = 1 to 3 of i means 1 + 2 + 3. A <b>subscript</b> labels a position: x₁ is the first item, not x multiplied by 1.'],
      ['Logs, floors & choosing', 'log₂(8) = 3 asks “what power of 2 gives 8?” The floor ⌊x⌋ rounds down to the greatest integer at most x: ⌊2.8⌋ = 2 and ⌊−2.3⌋ = −3. A <b>factorial</b>, 4!, is 4 × 3 × 2 × 1 = 24; 0! = 1. The binomial coefficient C(n,r), also written as n over r in brackets, counts choices of r positions among n: C(3,2) = 3.']
    ],
    formula: 'f(x) = x² + 1     f(3) = 3² + 1 = 10',
    legend: [['∈', '“Belongs to”: 1 ∈ {0,1}.'], ['⊆', '“Is a subset of”: every item in the left set is in the right set.'], ['|A|', 'Number of elements in set A; for a word, its length.'], ['x²', 'x multiplied by itself.'], ['Σ', 'Add up the stated terms.'], ['≤ / ≥', 'Less than or equal to / greater than or equal to.']],
    example: {title: 'Read a formula one move at a time', steps: ['Given f(x) = x² + 1, the input is x and the output is f(x).', 'For f(3), replace every x with 3: 3² + 1.', 'Do the power first: 3 × 3 = 9.', 'Add 1: 9 + 1 = 10. The function’s output is 10.']},
    check: {prompt: 'If f(x) = x² + 1, what is f(4)?', answer: '17', hint: 'Replace x with 4. Square it before adding 1.', explanation: '4² + 1 = 4 × 4 + 1 = 16 + 1 = 17.'},
    takeaway: 'Translate a symbol into words, substitute the values, and do one operation at a time.'
  },
  {
    id: 'modulo', part: 'Getting comfortable', title: 'Modulo: numbers that wrap around', minutes: 12,
    subtitle: 'The clock idea behind almost every cipher in this book.', source: 'Cryptography notes §3.4–3.5', lab: 'mod',
    goal: 'Calculate a remainder and explain congruence.',
    sections: [
      ['A clock is the right starting point', 'On a 12-hour clock, 10 hours after 8 lands at 6. You calculate 8 + 10 = 18, then remove one complete turn of 12: 18 − 12 = 6. <b>Modular arithmetic</b> treats numbers that differ by complete turns as equivalent. The <b>modulus</b> is the size of a turn.'],
      ['Find the remainder', 'a mod n means the remainder after dividing integer a by positive integer n. We use a remainder from 0 to n − 1. For 23 mod 7, remove 7 three times: 23 = 3 × 7 + 2, so the remainder is 2. The quotient is 3. Even a negative number has a nonnegative representative: −3 mod 7 = 4 because −3 + 7 = 4.'],
      ['Equals is different from congruent', '23 ≡ 2 (mod 7) says the two numbers have the same remainder modulo 7. They are <b>congruent</b>. It does not say that ordinary integers 23 and 2 are equal. Their difference, 21, is divisible by 7.'],
      ['Add, multiply, then reduce', 'Modulo 7, 5 + 6 ≡ 4 because 11 − 7 = 4. Also 5 × 6 ≡ 2 because 30 − 28 = 2. Reducing intermediate answers keeps calculations small. Ordinary division is not automatically allowed: later we will learn when a modular inverse exists.']
    ],
    formula: 'a = qn + r     0 ≤ r < n',
    legend: [['a', 'The integer being divided.'], ['n', 'The positive modulus.'], ['q', 'The whole-number quotient.'], ['r', 'The remainder, chosen from 0 to n − 1.'], ['≡', '“Is congruent to”: has the same remainder.'], ['mod', 'Work with remainders for this modulus.']],
    example: {title: 'Calculate 17 + 9 modulo 7', steps: ['Add the numbers normally: 17 + 9 = 26.', 'Find a multiple of 7 at most 26: 7 × 3 = 21.', 'Subtract: 26 − 21 = 5.', 'Write 17 + 9 ≡ 5 (mod 7). Alternatively, reduce 17 to 3 and 9 to 2, then add: 3 + 2 = 5.']},
    check: {prompt: 'What is 29 mod 6? Enter the remainder.', answer: '5', hint: '6 × 4 = 24. What remains after removing 24 from 29?', explanation: '29 = 4 × 6 + 5, so 29 mod 6 = 5.'},
    takeaway: 'Modulo means keep the remainder. Congruence means two numbers wrap to the same place.'
  },
  {
    id: 'inverse', part: 'Getting comfortable', title: 'GCDs & modular inverses', minutes: 14,
    subtitle: 'How to undo multiplication when numbers wrap.', source: 'Cryptography notes §3.5 and applications', lab: 'inverse',
    goal: 'Use Euclid’s algorithm and recognize when a modular inverse exists.',
    sections: [
      ['The greatest common divisor', 'A <b>divisor</b> divides a number without a remainder. gcd(a,b), the <b>greatest common divisor</b>, is the largest positive divisor shared by a and b. gcd(12,8) = 4. Numbers are <b>coprime</b> when their GCD is 1. This does not require both numbers to be prime.'],
      ['Euclid’s remainder recipe', 'The <b>Euclidean algorithm</b> repeatedly replaces a pair (a,b) with (b, a mod b). Stop when the second value is zero. The last nonzero remainder is the GCD. Why does it work? If a = qb + r, every common divisor of a and b also divides r, and every common divisor of b and r also divides a.'],
      ['The inverse is an undo button', 'The <b>modular inverse</b> of a modulo n is a value x with ax ≡ 1 (mod n). Write x = a⁻¹. This means undo multiplication by a; it is not ordinary decimal division. An inverse exists exactly when gcd(a,n) = 1. For example, 3 has no inverse modulo 6: every multiple of 3 has remainder 0 or 3, never 1.'],
      ['Bézout and extended Euclid', '<b>Bézout’s identity</b> expresses gcd(a,n) as ax + ny for integer coefficients x,y. The <b>extended Euclidean algorithm</b> finds those coefficients by recording the remainder steps and working backwards. If the GCD is 1, reducing ax + ny = 1 modulo n leaves ax ≡ 1. So x is the inverse, reduced to the usual remainder range.']
    ],
    formula: 'ax + ny = 1  ⇒  ax ≡ 1 (mod n)',
    legend: [['gcd(a,n)', 'Greatest common divisor.'], ['a⁻¹', 'Multiplicative inverse of a in the stated modulus.'], ['x, y', 'Integer coefficients in Bézout’s identity.'], ['⇒', '“Implies”: the statement on the left gives the one on the right.']],
    example: {title: 'Find the inverse of 3 modulo 13', steps: ['Divide: 13 = 4 × 3 + 1.', 'Rearrange to isolate the remainder: 1 = 13 − 4 × 3.', 'Reduce modulo 13: 1 ≡ (−4) × 3. The coefficient −4 is an inverse.', 'Choose the nonnegative representative: −4 + 13 = 9.', 'Check: 3 × 9 = 27 = 2 × 13 + 1. Therefore 3⁻¹ ≡ 9 (mod 13).']},
    check: {prompt: 'What is the inverse of 2 modulo 7? Use a number from 0 to 6.', answer: '4', hint: 'Find x such that 2 × x leaves remainder 1 on division by 7.', explanation: '2 × 4 = 8, and 8 mod 7 = 1. The inverse is 4.'},
    takeaway: 'An inverse modulo n exists when a and n are coprime. Extended Euclid finds it.'
  },
  {
    id: 'algebra', part: 'Getting comfortable', title: 'Groups, rings & fields', minutes: 14,
    subtitle: 'Names for number systems with reliable rules.', source: 'Cryptography notes §3.1–3.4 and §4.10–4.12',
    goal: 'Distinguish a group, a ring, and a field using small examples.',
    sections: [
      ['A group: one operation you can undo', 'A <b>group</b> is a set with an operation that stays inside the set (<b>closure</b>), is associative, has an identity, and gives each element an inverse. <b>Associative</b> means changing brackets does not change the answer. An <b>identity</b> does nothing, such as 0 for addition. An <b>abelian</b> group also allows swapping the order. Integers under addition are an abelian group: the inverse of 3 is −3.'],
      ['A ring: addition and multiplication', 'A <b>ring</b> has an abelian group under addition, associative multiplication, and the distributive law a(b + c) = ab + ac. Our examples have a multiplicative identity 1. In a <b>commutative ring</b>, ab = ba. Integers are a ring, but not a field: 2 has no integer multiplicative inverse.'],
      ['A field: every nonzero value has a multiplicative inverse', 'A <b>field</b> is a commutative ring with 1 ≠ 0 where every nonzero element can be divided by using its inverse. The real numbers form a field. Integers modulo p form a field exactly when p is prime. A <b>prime</b> is an integer greater than 1 with only two positive divisors: 1 and itself. Modulo 7 gives a field; modulo 6 does not.'],
      ['Finite fields and group sizes', 'A finite field is also called a <b>Galois field</b>. GF(q) has q elements, where q is a prime power pʳ. For r > 1, it is not simply integers modulo pʳ; we construct it with polynomials in Chapter 20. <b>Lagrange’s theorem</b> says a subgroup’s size divides a finite group’s size. <b>Wedderburn’s little theorem</b> says every finite division ring is commutative, so it is a field.']
    ],
    formula: 'GF(5) = {0,1,2,3,4}     2 × 3 ≡ 1 (mod 5)',
    legend: [['GF(q)', 'A finite field with q elements.'], ['pʳ', 'A prime p raised to a positive integer power r.'], ['∗', 'A chosen group operation; it need not be ordinary multiplication.'], ['e', 'The identity element of a group.']],
    example: {title: 'Why modulo 5 permits division', steps: ['The nonzero elements are 1, 2, 3, 4.', '1 × 1 ≡ 1 and 4 × 4 = 16 ≡ 1.', '2 × 3 = 6 ≡ 1, so 2 and 3 are each other’s inverses.', 'Every nonzero element has an inverse. Integers modulo 5 form a field.']},
    check: {prompt: 'Which system is a field?', options: ['Integers modulo 7', 'Integers modulo 8', 'All integers with ordinary arithmetic'], answer: 0, hint: 'For integers modulo n, the field test is whether n is prime.', explanation: '7 is prime, so every nonzero remainder has an inverse modulo 7. Modulo 8, for example, 2 has no inverse.'},
    takeaway: 'A group has one reversible operation. A field supports addition, subtraction, multiplication, and division by nonzero values.'
  },
  {
    id: 'powers', part: 'Getting comfortable', title: 'Fast powers & Fermat’s theorem', minutes: 12,
    subtitle: 'Build a large power with a few small calculations.', source: 'Cryptography notes §3.6–3.8 and §4.2', lab: 'power',
    goal: 'Use repeated squaring and know the conditions for Fermat’s little theorem.',
    sections: [
      ['Do not multiply a hundred times', '<b>Repeated squaring</b> builds a², a⁴, a⁸, and so on by squaring the last result. To find a¹³, use 13 = 8 + 4 + 1, so a¹³ = a⁸a⁴a. Reduce each step modulo n to keep the values small. This is <b>square-and-multiply</b>, or modular exponentiation when using a modulus.'],
      ['Fermat’s little theorem', 'For prime p and integer a not divisible by p, aᵖ⁻¹ ≡ 1 (mod p). The equivalent form aᵖ ≡ a (mod p) holds for every integer a. The prime condition matters. You cannot automatically use this rule with a composite modulus.'],
      ['How much work?', '<b>Complexity</b> describes how work grows with input size. A number near 2ᵇ takes about b bits to write. Brute-force search over b secret bits can require about 2ᵇ trials. Square-and-multiply uses O(log e) modular multiplications for exponent e: roughly proportional to the number of bits in e. Each multiplication itself also has a cost.']
    ],
    formula: '3¹³ ≡ 3⁸ × 3⁴ × 3 (mod 7)',
    legend: [['aᵉ', 'Multiply a by itself e times; e is the exponent.'], ['O(log e)', 'An order-of-growth bound proportional to the exponent’s digit count.'], ['aᵖ⁻¹', 'a raised to (p − 1), not aᵖ minus 1.'], ['p ∤ a', 'p does not divide a.']],
    example: {title: 'Compute 3¹³ modulo 7', steps: ['3² = 9 ≡ 2 (mod 7).', '3⁴ ≡ 2² = 4 (mod 7).', '3⁸ ≡ 4² = 16 ≡ 2 (mod 7).', '13 = 8 + 4 + 1, so multiply 2 × 4 × 3 = 24.', '24 mod 7 = 3. Check with Fermat: 3⁶ ≡ 1, so 3¹³ = (3⁶)² × 3 ≡ 3.']},
    check: {prompt: 'What is 2⁵ mod 7?', answer: '4', hint: '2⁵ = 32. Remove the largest multiple of 7 that fits.', explanation: '2⁵ = 32 = 4 × 7 + 4, so the remainder is 4.'},
    takeaway: 'Square, reduce, and multiply the powers you need. Always check a theorem’s conditions.'
  },
  {
    id: 'classical', part: 'Protecting information', title: 'Classical & symmetric ciphers', minutes: 9,
    subtitle: 'A first cipher you can do with a pencil.', source: 'Cryptography notes §1.1–2', lab: 'caesar',
    goal: 'Encrypt and decrypt a Caesar shift and explain its weakness.',
    sections: [
      ['From objects to alphabets', 'A <b>scytale</b> wraps a strip around a staff so letters line up. A disk cipher uses a physical arrangement of letters. <b>Atbash</b> reverses the alphabet: A becomes Z. A <b>Caesar cipher</b> shifts each letter by a fixed amount. These historical methods help us see what a key controls.'],
      ['Same secret at both ends', '<b>Symmetric encryption</b> uses a shared secret key to encrypt and decrypt. For Caesar, the key k is the shift. Use A = 0, B = 1, …, Z = 25. Encrypt by adding k modulo 26; decrypt by subtracting k modulo 26. Modern symmetric ciphers such as AES use far more sophisticated transformations.'],
      ['Why a fixed alphabet leaks patterns', '<b>Monoalphabetic</b> means one fixed substitution alphabet. Repeated letters stay repeated. <b>Frequency analysis</b> compares counts of ciphertext letters with usual language patterns; it offers guesses, not certainty about every letter. Caesar also has only 26 possible shifts, so an attacker can try them all.']
    ],
    formula: 'c = (m + k) mod 26     m = (c − k) mod 26',
    legend: [['m / c', 'The number of one plaintext / ciphertext letter.'], ['k', 'The shared shift.'], ['26', 'The number of letters in this alphabet.']],
    example: {title: 'Encrypt CAT with shift 3', steps: ['C = 2. Add 3: 5 = F.', 'A = 0. Add 3: 3 = D.', 'T = 19. Add 3: 22 = W. The ciphertext is FDW.', 'To decrypt F, subtract 3: 5 − 3 = 2 = C. The same process recovers CAT.']},
    check: {prompt: 'Encrypt Z with a Caesar shift of 3. Which letter results?', options: ['C', 'B', 'W'], answer: 0, hint: 'Move Z → A → B → C.', explanation: 'Z = 25. (25 + 3) mod 26 = 2, and letter 2 is C.'},
    takeaway: 'A shared key reverses the transformation, but a tiny key space and repeated patterns make Caesar easy to break.'
  },
  {
    id: 'vigenere', part: 'Protecting information', title: 'Vigenère & the Kasiski idea', minutes: 10,
    subtitle: 'Change the shift, then notice what repetition reveals.', source: 'Cryptography notes §2.1–2.2',
    goal: 'Use a repeated keyword and interpret repeated ciphertext distances.',
    sections: [
      ['One key letter per message letter', 'Vigenère repeats a keyword beneath the message. Each key letter supplies a Caesar shift using A = 0, …, Z = 25. This is <b>polyalphabetic</b>: the substitution alphabet can change with position. A Vigenère table lists all 26 shifts, but addition gives the same result.'],
      ['The repeating-key weakness', 'If the key has length L, positions 1, 1 + L, 1 + 2L use the same shift. Knowing L lets an attacker split the ciphertext into L Caesar-like groups and analyze their frequencies. The most frequent ciphertext letter does not automatically equal the key letter; it must be compared with likely plaintext frequencies.'],
      ['Kasiski finds clues, not guarantees', 'Repeated ciphertext chunks may come from repeated plaintext under the same key positions. Their separations may be multiples of L. Take GCDs of distances to obtain candidate key lengths. Coincidental repetitions and short messages can mislead the method.']
    ],
    formula: 'cᵢ = (mᵢ + kᵢ) mod 26',
    legend: [['i', 'The position of a letter.'], ['mᵢ / kᵢ / cᵢ', 'Message, repeated key, and ciphertext values at position i.'], ['L', 'Keyword length.']],
    example: {title: 'Encrypt CAT with the key KEY', steps: ['Message values: C = 2, A = 0, T = 19.', 'Key values: K = 10, E = 4, Y = 24.', 'Add position by position: 2 + 10 = 12 = M; 0 + 4 = 4 = E.', '(19 + 24) mod 26 = 17 = R. Ciphertext: MER.', 'For decryption subtract the same key values modulo 26, recovering CAT.']},
    check: {prompt: 'Repeated chunks are separated by 12 and 18 characters. What is their GCD, a candidate key length?', answer: '6', hint: 'List the common divisors of 12 and 18. Which is largest?', explanation: 'gcd(12,18) = 6. Six is a candidate; these distances alone do not prove the key length.'},
    takeaway: 'Changing shifts hides simple frequencies; repeating the key still introduces exploitable structure.'
  },
  {
    id: 'otp', part: 'Protecting information', title: 'Bits, XOR & the one-time pad', minutes: 10,
    subtitle: 'Perfect secrecy has precise conditions.', source: 'Cryptography notes §2.3; added binary foundation', lab: 'xor',
    goal: 'Compute XOR and explain why pad reuse is dangerous.',
    sections: [
      ['A bit is either 0 or 1', 'A <b>binary string</b> is a sequence of bits. <b>XOR</b>, written ⊕, produces 0 for equal bits and 1 for different bits: 0 ⊕ 0 = 0, 0 ⊕ 1 = 1, 1 ⊕ 0 = 1, 1 ⊕ 1 = 0. It is also addition in GF(2).'],
      ['The Vernam / one-time-pad idea', 'Encrypt a bit string with c = m ⊕ k. Decrypt with m = c ⊕ k because each key bit cancels itself. A <b>one-time pad</b> has perfect secrecy when its key is uniformly random, independent of the message, secret, as long as the message, and never reused. “Long” or “nonrepeating” alone is insufficient.'],
      ['What goes wrong with reuse?', 'With the same pad, c₁ ⊕ c₂ = m₁ ⊕ m₂. An attacker learns a relationship between messages, and known plaintext can expose the pad. A pseudorandom stream generated from a short key is a <b>stream cipher</b>, not an information-theoretically secure one-time pad. The pad also needs a separate integrity mechanism.']
    ],
    formula: '(m ⊕ k) ⊕ k = m',
    legend: [['⊕', 'Exclusive OR: 1 when the two bits differ.'], ['m, k, c', 'Message, equal-length key, and ciphertext bit strings.'], ['c₁ / c₂', 'Two different ciphertexts.']],
    example: {title: 'Encrypt and recover four bits', steps: ['Message m = 1010; key k = 0110.', 'XOR each position: 1⊕0=1, 0⊕1=1, 1⊕1=0, 0⊕0=0.', 'The ciphertext is 1100.', 'XOR 1100 with 0110 again: 1010. You recover the message.']},
    check: {prompt: 'Compute 1011 ⊕ 1100. Enter four bits.', answer: '0111', hint: 'Write 0 for matching bits and 1 for different bits.', explanation: 'The four XOR results are 0, 1, 1, 1. Keep the leading zero: 0111.'},
    takeaway: 'XOR is reversible with the same key. Perfect secrecy requires true randomness, secrecy, and one-time use.'
  },
  {
    id: 'rsa', part: 'Protecting information', title: 'Public keys & a tiny RSA example', minutes: 15,
    subtitle: 'Share a way to lock; keep the way to unlock.', source: 'Cryptography notes §4.1–4.4', lab: 'rsa',
    goal: 'Build a small RSA key pair and follow encryption and decryption.',
    sections: [
      ['Two related keys', '<b>Public-key</b> (asymmetric) encryption uses a public key to encrypt for a receiver and a private key to decrypt. The public key can be shared. The private key must remain secret. The receiver must still authenticate public keys, or an attacker could substitute their own.'],
      ['Build the RSA keys', 'Choose distinct primes p,q. Compute n = pq and λ = lcm(p − 1,q − 1). The <b>least common multiple</b> is the smallest positive common multiple. Choose e with gcd(e,λ) = 1. Find positive d with ed ≡ 1 (mod λ). The public key is (n,e); keep d and the prime factors private. Messages are integers in 0 ≤ m < n.'],
      ['Why decryption works', 'Encrypt c = mᵉ mod n. Decrypt m = cᵈ mod n. Because ed is 1 plus a multiple of λ, Fermat’s theorem gives the right remainder modulo each prime, including the zero cases separately. The <b>Chinese remainder theorem</b> says matching remainders modulo coprime p and q determine one remainder modulo pq.'],
      ['Maths model and real use', 'Factoring n reveals the secret-key construction; factoring large integers is therefore a central attack. A tiny example and raw textbook RSA are not secure encryption schemes. Real RSA encryption uses an encoding scheme such as OAEP; signatures use a signature scheme such as PSS. These are background context, not extra exam assumptions.']
    ],
    formula: 'c = mᵉ mod n     m = cᵈ mod n     ed ≡ 1 (mod λ)',
    legend: [['p, q', 'The two distinct secret primes.'], ['n', 'Their product; the RSA modulus.'], ['λ', 'Greek lambda: lcm(p − 1,q − 1).'], ['e / d', 'Public / private exponent.']],
    example: {title: 'RSA with p = 3 and q = 11', steps: ['n = 3 × 11 = 33; λ = lcm(2,10) = 10.', 'Choose e = 3. Find d = 7 because 3 × 7 = 21 ≡ 1 (mod 10).', 'Encrypt m = 4: 4³ = 64; 64 mod 33 = 31.', 'Decrypt: 31 ≡ −2, so 31⁷ ≡ (−2)⁷ = −128 ≡ 4 (mod 33).', 'The recovered message is 4. This example uses λ; using φ(n) = (p−1)(q−1) also gives a valid inverse construction.']},
    check: {prompt: 'With public key (n,e) = (33,3), what is the ciphertext for m = 2?', answer: '8', hint: 'Compute 2³, then reduce modulo 33.', explanation: '2³ = 8, which is already less than 33. The ciphertext is 8.'},
    takeaway: 'RSA combines prime numbers, modular powers, and a modular inverse for the private exponent.'
  },
  {
    id: 'dh', part: 'Protecting information', title: 'Diffie–Hellman & ElGamal', minutes: 14,
    subtitle: 'Agree on a secret through a visible conversation.', source: 'Cryptography notes §4.6–4.13',
    goal: 'Calculate a shared secret and see how ElGamal uses it.',
    sections: [
      ['Forward powers, hard reverse problem', 'For a chosen group and base g, computing gᵃ is efficient. The <b>discrete logarithm problem</b> asks for a from gᵃ; appropriate large groups make this hard. A <b>generator</b> reaches every element of a cyclic group through its powers. Exponents repeat modulo the group’s order. In GF(p), the nonzero multiplicative group has order p − 1.'],
      ['The key-exchange steps', 'Alice privately chooses a and sends A = gᵃ mod p. Bob privately chooses b and sends B = gᵇ mod p. Alice computes Bᵃ; Bob computes Aᵇ. Both equal gᵃᵇ mod p. Basic Diffie–Hellman does not authenticate the participants, so an active attacker can intervene.'],
      ['ElGamal encryption', 'Bob’s secret is b and public key is y = gᵇ. Alice chooses a fresh random r. She sends (c₁,c₂) = (gʳ, m yʳ), with arithmetic modulo p. Bob computes c₁ᵇ, inverts it, and multiplies that inverse by c₂ to recover m. The usual multiplicative form encodes messages as group elements.'],
      ['A note about generators', 'Lagrange constrains element orders. <b>Artin’s primitive-root conjecture</b> concerns how often a fixed integer generates the nonzero residues modulo primes; for integers other than −1 or perfect squares, it predicts infinitely many such primes. It is a conjecture, not a theorem you may assume proved.']
    ],
    formula: 'Bᵃ = (gᵇ)ᵃ = gᵃᵇ = (gᵃ)ᵇ = Aᵇ  (mod p)',
    legend: [['g', 'Public base (a generator in this example).'], ['a / b', 'Alice’s / Bob’s secret exponent.'], ['A / B', 'Public values; these uppercase letters are numbers here.'], ['r', 'Fresh random exponent for ElGamal.']],
    example: {title: 'Agree on a key modulo 23', steps: ['Public parameters: p = 23, g = 5. Alice uses a = 6; Bob uses b = 15.', 'Alice sends A = 5⁶ mod 23 = 8. Bob sends B = 5¹⁵ mod 23 = 19.', 'Alice calculates 19⁶ mod 23 = 2; Bob calculates 8¹⁵ mod 23 = 2.', 'For a tiny ElGamal example using Bob’s key and r = 6, m = 7 gives (8,14), since 7 × 2 = 14.', 'Bob uses shared value 2. Its inverse modulo 23 is 12; 14 × 12 mod 23 = 7.']},
    check: {prompt: 'For p = 23, g = 5, a = 2, b = 3, the shared key is 5⁶ mod 23. What is it?', answer: '8', hint: '5² mod 23 = 2, so 5⁶ = (5²)³ ≡ 2³.', explanation: '5⁶ mod 23 = 2³ mod 23 = 8. Both participants obtain 8.'},
    takeaway: 'Diffie–Hellman establishes a shared value. ElGamal uses a fresh shared value to mask a message.'
  },
  {
    id: 'signatures', part: 'Protecting information', title: 'Hashes & digital signatures', minutes: 12,
    subtitle: 'Check who signed a message and whether it changed.', source: 'Cryptography notes §5.1–5.3',
    goal: 'Separate hashing, signing, and encryption.',
    sections: [
      ['A compact fingerprint', 'A <b>hash function</b> maps data to a fixed-length value called a digest. It is not encryption and has no decryption key. A cryptographic hash should resist finding an input for a chosen digest (<b>preimage</b>), another input matching a given one (<b>second preimage</b>), or any two inputs with equal digests (<b>collision</b>). Collisions must exist because inputs outnumber possible digests.'],
      ['Signing and verifying', 'A <b>digital signature</b> is generated using the signer’s private key and verified using their public key. It helps establish integrity and origin when the public key is trusted. Signing does not hide the message. A plain hash alone does not authenticate a sender: an attacker can replace both the message and its hash.'],
      ['Two course constructions', 'The textbook RSA signature model uses s = H(m)ᵈ mod n and verifies sᵉ ≡ H(m) mod n. Real schemes also encode the digest. In an ElGamal signature, choose nonce k coprime to p − 1, set r = gᵏ mod p and s = k⁻¹(H(m) − xr) mod (p − 1), where x is the signer’s secret. Verify gᴴ⁽ᵐ⁾ ≡ yʳrˢ (mod p), with y = gˣ. Never reuse the nonce.']
    ],
    formula: 's = H(m)ᵈ mod n     sᵉ ≡ H(m) (mod n)',
    legend: [['H(m)', 'The digest of message m; H here is a hash, not a parity-check matrix.'], ['s', 'The signature value in the toy RSA model.'], ['d / e', 'Private signing exponent / public verification exponent.'], ['nonce', 'A per-signature value; the scheme specifies how to choose it.']],
    example: {title: 'Verify a classroom RSA signature', steps: ['Use the tiny key n = 33, e = 3, d = 7. Suppose the digest representative is 2.', 'The signer computes s = 2⁷ mod 33 = 128 mod 33 = 29.', 'The verifier computes 29³ mod 33. Since 29 ≡ −4, this is −64 mod 33 = 2.', 'The recovered value matches the digest representative 2. If the digest becomes 3, this signature no longer matches.']},
    check: {prompt: 'Which key does a recipient use to verify a digital signature?', options: ['The signer’s public key', 'The signer’s private key', 'The recipient’s private key'], answer: 0, hint: 'The signer keeps one key secret; everyone can use the other to check.', explanation: 'Verify with the signer’s public key, after establishing that the key belongs to the intended signer.'},
    takeaway: 'Hashing produces a digest; signing authenticates with a private key; encryption hides content.'
  },
  {
    id: 'attacks', part: 'Protecting information', title: 'Factoring, cycles & collisions', minutes: 14,
    subtitle: 'Learn the attacks to understand the design.', source: 'Cryptography notes §4.5 and §6.1–6.6',
    goal: 'Recognize the purpose of the main factoring and collision methods.',
    sections: [
      ['Prime density and factoring', 'The <b>prime number theorem</b> estimates π(x), the number of primes at most x, by x/ln(x) for large x. It describes density; it does not test one number for primality. Trial division tries possible factors. <b>Pollard’s p − 1</b> method seeks a factor p whose p − 1 factors into small primes. Compute a large power with a suitable exponent M and take gcd(aᴹ − 1,n); a result strictly between 1 and n is a useful factor.'],
      ['Pollard rho and Floyd’s two speeds', '<b>Pollard rho</b> iterates a function such as f(x) = x² + 1 modulo n. A collision modulo an unknown factor can reveal that factor through gcd(|x − y|,n). <b>Floyd’s cycle detection</b> moves one value one step and another two steps, avoiding a long stored list. A result of n means that attempt failed; retry with different parameters. Related rho methods solve discrete logarithms by tracking exponent relations.'],
      ['Why collisions appear early', 'The <b>birthday paradox</b> concerns any matching pair, not one predetermined value. For roughly uniform independent samples from N outcomes, a collision becomes likely after on the order of √N draws. For a b-bit ideal hash, generic collision work is around 2ᵇ⁄²; finding a chosen preimage is around 2ᵇ.'],
      ['Lenstra’s elliptic-curve method', '<b>Lenstra’s ECM</b> performs elliptic-curve arithmetic modulo a composite n. A failed denominator inversion may produce a nontrivial GCD and reveal a factor. Different curves have different group orders modulo the hidden prime; smooth orders help. This chapter introduces the mechanism; it does not derive the advanced runtime estimates.']
    ],
    formula: 'd = gcd(|x − y|, n)     useful when 1 < d < n',
    legend: [['π(x)', 'Number of primes at most x; not the circle constant π here.'], ['ln(x)', 'Natural logarithm.'], ['|x − y|', 'Absolute difference: remove any minus sign.'], ['√N', 'Square root of N.'], ['smooth', 'Having only small prime factors.']],
    example: {title: 'A tiny Pollard-rho factor', steps: ['Let n = 15, f(x) = x² + 1 mod 15, and start x = y = 2.', 'Move x one step: f(2) = 5.', 'Move y two steps: f(f(2)) = f(5) = 26 mod 15 = 11.', 'Take gcd(|5 − 11|,15) = gcd(6,15) = 3.', 'Since 1 < 3 < 15, you found a nontrivial factor; the other factor is 15 / 3 = 5.']},
    check: {prompt: 'In the example, gcd(6,15) reveals which factor?', answer: '3', hint: 'The largest shared positive divisor of 6 and 15 is…', explanation: 'The GCD is 3. It is neither 1 nor 15, so it splits 15 into 3 × 5.'},
    takeaway: 'Number-theoretic structure and collisions can turn a hard-looking search into a much cheaper attack.'
  },
  {
    id: 'elliptic', part: 'Protecting information', title: 'Projective points & elliptic curves', minutes: 15,
    subtitle: 'A new group, built from points instead of integers.', source: 'Cryptography notes §4.14',
    goal: 'Read a curve equation and understand point addition and the point at infinity.',
    sections: [
      ['First: coordinates and points at infinity', 'An ordinary (<b>affine</b>) point is a pair (x,y). A projective point [X:Y:Z] identifies proportional nonzero triples: [2:4:2] = [1:2:1]. When Z ≠ 0, it represents (X/Z,Y/Z). Z = 0 describes points at infinity. The projective line similarly uses pairs [X:Z]; Monge’s model visualizes these as lines through the origin. A homogeneous polynomial has terms of the same total degree. Ratios of same-degree homogeneous polynomials do not change under common scaling, where defined.'],
      ['The curve equation', 'Over a field of characteristic greater than 3, a short Weierstrass elliptic curve is y² = x³ + ax + b, with 4a³ + 27b² ≠ 0. This last condition excludes singular curves with cusps or crossings. Over a finite field, test coordinates using field arithmetic; the curve is a finite set of points, not a continuous drawing.'],
      ['Addition has a geometric rule', 'Over the reals, a line through two points meets the curve at a third point; reflect that point in the x-axis to define the sum. For doubling use the tangent. The point at infinity O is the identity. P + (−P) = O. For different x-coordinates, the slope is (y₂ − y₁)/(x₂ − x₁); over a finite field, division means multiplying by an inverse.'],
      ['How cryptography uses the group', 'Repeated point addition is <b>scalar multiplication</b>: 3P means P + P + P. Given P and Q = aP, recovering a is an elliptic-curve discrete logarithm problem. The curve, subgroup, and implementation must be chosen appropriately. Doubling formulas use slope (3x₁² + a)/(2y₁); if y₁ = 0, doubling gives O.']
    ],
    formula: 'y² = x³ + ax + b     Q = kP',
    legend: [['(x,y)', 'Coordinates of a point.'], ['[X:Y:Z]', 'Projective coordinates; proportional triples describe the same point.'], ['O', 'The point at infinity, the group identity.'], ['kP', 'Add point P to itself k times.']],
    example: {title: 'Check a point on a curve modulo 11', steps: ['Take y² = x³ + x + 1 modulo 11 and P = (1,5).', 'Left side: 5² = 25 ≡ 3 (mod 11).', 'Right side: 1³ + 1 + 1 = 3. The two sides match, so P is on the curve.', 'The opposite point is (1,−5) = (1,6) modulo 11. Their sum is O.']},
    check: {prompt: 'On this curve modulo 11, what is the y-coordinate of −(1,5), in the range 0–10?', answer: '6', hint: 'Reduce −5 modulo 11.', explanation: '−5 + 11 = 6. The opposite point is (1,6).'},
    takeaway: 'Elliptic curves supply a group of points. Scalar multiplication is the easy direction used in cryptography.'
  },
  {
    id: 'distance', part: 'Making data resilient', title: 'Words, weight & Hamming distance', minutes: 10,
    subtitle: 'Measure how much a message has changed.', source: 'Coding Theory — Initial definitions; cryptography notes §7.2–7.3', lab: 'distance',
    goal: 'Count weight and distance, and explain why codewords need separation.',
    sections: [
      ['An alphabet and a word', 'An <b>alphabet</b> A is a set of allowed symbols. A <b>word</b> is a sequence of those symbols. For binary data A = {0,1}. Aⁿ means all length-n words over A. A <b>block code</b> C is a selected subset of Aⁿ: only its words are valid codewords.'],
      ['Count nonzero positions', 'The <b>Hamming weight</b> wt(w) counts nonzero symbols in a word. wt(10110) = 3. The <b>Hamming distance</b> d(u,v) counts positions at which equal-length words differ. It is not the numerical difference between the binary values.'],
      ['Keep the valid words far apart', 'The code’s <b>minimum distance</b> d is the smallest distance between distinct codewords. If valid words are far apart, a small error is less likely to turn one into another or make the original ambiguous. Distances satisfy a triangle inequality: going through an intermediate word cannot shorten the direct distance.']
    ],
    formula: 'd(u,v) = number of positions where uᵢ ≠ vᵢ',
    legend: [['Aⁿ', 'All words of length n over alphabet A.'], ['C ⊆ Aⁿ', 'The valid codewords form a subset.'], ['wt(w)', 'Number of nonzero entries in w.'], ['≠', 'Not equal.']],
    example: {title: 'Compare 10110 and 10001', steps: ['Position 1: 1 and 1 match.', 'Position 2: 0 and 0 match.', 'Positions 3, 4, 5 differ: 1/0, 1/0, and 0/1.', 'There are 3 differences, so d(10110,10001) = 3. The first word also has weight 3.']},
    check: {prompt: 'What is the Hamming distance between 11001 and 10011?', answer: '2', hint: 'Compare each of the five positions; count only mismatches.', explanation: 'Positions 2 and 4 differ. All other positions match, so the distance is 2.'},
    takeaway: 'Weight counts nonzero symbols in one word. Distance counts disagreements between two words.'
  },
  {
    id: 'linear', part: 'Making data resilient', title: 'Vectors, matrices & linear codes', minutes: 13,
    subtitle: 'Treat a word as a row of values you can calculate with.', source: 'Coding Theory — Vector spaces, rank, dimension, Linear Codes',
    goal: 'Understand a basis, dimension, rank, and [n,k,d] notation.',
    sections: [
      ['Vectors are lists', 'A <b>vector</b> is an ordered list, such as (1,0,1). Add vectors position by position; multiply by a field value called a scalar. A <b>vector space</b> is a collection closed under these operations. Over GF(2), 1 + 1 = 0, so (1,0,1) + (1,1,0) = (0,1,1).'],
      ['Basis and dimension', 'A <b>linear combination</b> adds scalar multiples of vectors. A <b>basis</b> is a set of independent vectors that generates the entire space. Independent means no vector is redundant in such a generating set. The <b>dimension</b> k is the number of basis vectors. A space over GF(q) of dimension k contains qᵏ vectors.'],
      ['Rows, columns and rank', 'A <b>matrix</b> is a rectangular table of values. Its <b>rank</b> is the number of independent rows (also the number of independent columns). The <b>kernel</b> of a linear map is the set of inputs it maps to zero. The dimension theorem, or rank–nullity, says input dimension = rank + kernel dimension.'],
      ['A linear code', 'A <b>linear code</b> is a vector subspace of GF(q)ⁿ. Write [n,k,d]q: length n, dimension k, minimum distance d, alphabet size q. It has qᵏ codewords and rate R = k/n. For a nonzero linear code, the minimum distance equals the smallest nonzero weight, because differences of codewords remain codewords.']
    ],
    formula: '|C| = qᵏ     R = k/n',
    legend: [['[n,k,d]q', 'Length, dimension, minimum distance, and field size.'], ['|C|', 'Number of codewords in C.'], ['R', 'Information symbols divided by total transmitted symbols.'], ['rank', 'Number of independent rows or columns.']],
    example: {title: 'Generate a small binary code', steps: ['Choose basis rows v₁ = 101 and v₂ = 011.', 'The coefficients are each 0 or 1, giving four choices.', '0v₁+0v₂ = 000; 1v₁+0v₂ = 101; 0v₁+1v₂ = 011; 1v₁+1v₂ = 110.', 'The code has length 3, dimension 2, and minimum nonzero weight 2: [3,2,2]₂. Its rate is 2/3.']},
    check: {prompt: 'How many codewords are in a binary linear code with dimension 4?', answer: '16', hint: 'There are 2 choices for each of 4 independent coefficients.', explanation: '|C| = 2⁴ = 16. Dimension is 4; codeword count is 16.'},
    takeaway: 'A basis generates every codeword. Dimension determines the number of independent message symbols.'
  },
  {
    id: 'matrices', part: 'Making data resilient', title: 'Generator matrices & syndromes', minutes: 15,
    subtitle: 'One matrix creates codewords. Another checks them.', source: 'Coding Theory — Representations and Error-correction procedure',
    goal: 'Encode with G, check with H, and interpret a syndrome.',
    sections: [
      ['Encoding with a generator', 'A <b>generator matrix</b> G has k independent rows and n columns. A length-k message row u gives codeword c = uG. For each output column, multiply the message entries by that column’s entries and add in the field. In binary, this addition is XOR.'],
      ['Checking with another matrix', 'A <b>parity-check matrix</b> H has n columns and rank n − k. Valid codewords obey cHᵀ = 0. The superscript T means transpose: swap rows and columns. For received row r, the <b>syndrome</b> s = rHᵀ checks these equations. Since r = c + e, where e is the error row, s = eHᵀ.'],
      ['Standard form and decoding', 'In <b>systematic form</b>, G = [Iₖ | P], so the original message appears at the start of the codeword. A matching H = [−Pᵀ | Iₙ₋ₖ]. I is an identity matrix, with 1 on its diagonal and 0 elsewhere. In binary, minus is the same as plus. Decoding chooses a likely error matching the syndrome. Zero syndrome means a valid received codeword, but some errors can change one valid codeword into another.'],
      ['Minimum distance from H', 'The minimum distance is the smallest number of linearly dependent columns of H. For a single binary error at position j, the syndrome equals column j. If those columns are nonzero and distinct, the syndrome identifies that one-error position.']
    ],
    formula: 'c = uG     s = rHᵀ     GHᵀ = 0',
    legend: [['u / c / r', 'Message / encoded word / received word.'], ['G / H', 'Generator / parity-check matrix.'], ['T', 'Transpose: rows become columns.'], ['s', 'Syndrome; the results of the parity checks.'], ['0', 'The all-zero vector or matrix of the needed size.']],
    example: {title: 'A single parity bit', steps: ['Use G with rows 101 and 011, and H with row 111, over GF(2).', 'For message u = 10, c = 1×101 + 0×011 = 101.', 'Check: 1 + 0 + 1 = 0 in GF(2). Its syndrome is zero.', 'If r = 100, the syndrome is 1 + 0 + 0 = 1. An error is detected.', 'H has three identical columns, so it cannot identify which bit changed. This code detects one error but cannot correct it reliably.']},
    check: {prompt: 'With H = [1 1 1], what is the binary syndrome of received word 110?', answer: '0', hint: 'Add 1 + 1 + 0 modulo 2.', explanation: '1 + 1 + 0 = 2 ≡ 0 (mod 2). It is a valid word; zero syndrome does not prove no error occurred.'},
    takeaway: 'G generates; H checks. A syndrome describes an error pattern, not necessarily the error’s unique location.'
  },
  {
    id: 'bounds', part: 'Making data resilient', title: 'Detection, correction & bounds', minutes: 14,
    subtitle: 'Distance sets the guaranteed error budget.', source: 'Coding Theory — Theorems, Singleton bound, Hamming bound, Perfect codes',
    goal: 'Calculate error guarantees and distinguish perfect from MDS codes.',
    sections: [
      ['What minimum distance guarantees', 'A code with minimum distance d detects up to d − 1 changed symbols when checking whether the received word is valid. Nearest-codeword decoding uniquely corrects up to t = ⌊(d − 1)/2⌋ errors. These are separate guarantees; they do not mean you can always distinguish larger errors while correcting.'],
      ['The Singleton bound', 'For a linear [n,k,d]q code, d ≤ n − k + 1. This limits the distance achievable with a fixed length and amount of information. A code meeting equality is <b>maximum-distance separable</b> (MDS), called “optimal” in the supplied notes.'],
      ['The Hamming packing bound', 'A radius-t Hamming ball contains Σ from i=0 to t of C(n,i)(q−1)ⁱ words: choose the changed positions and their replacement symbols. Balls around valid codewords must not overlap for guaranteed unique correction. Thus qᵏ times that ball size is at most qⁿ. A <b>perfect code</b> meets this packing bound exactly, covering all received words with these disjoint balls. Perfect and MDS describe different bounds.']
    ],
    formula: 'detect: d − 1     correct: ⌊(d − 1)/2⌋     d ≤ n − k + 1',
    legend: [['d', 'Minimum distance.'], ['t', 'Maximum number of guaranteed correctable errors.'], ['⌊ ⌋', 'Floor: round down.'], ['C(n,i)', 'Number of ways to select i positions among n.'], ['Σ', 'Add the ball sizes for each permitted error count.']],
    example: {title: 'The [7,4,3]₂ Hamming code', steps: ['d = 3, so detection alone catches up to 2 changed bits.', 't = ⌊(3 − 1)/2⌋ = 1, so unique decoding corrects 1 changed bit.', 'A radius-1 ball has 1 + 7 = 8 binary words.', 'There are 2⁴ = 16 codewords. 16 × 8 = 128 = 2⁷, so the code is perfect.', 'Singleton permits d ≤ 7 − 4 + 1 = 4. Its d = 3 does not meet that bound, so it is not MDS.']},
    check: {prompt: 'A code has minimum distance 5. How many errors can it always uniquely correct?', answer: '2', hint: 'Use floor((5 − 1)/2).', explanation: '⌊(5 − 1)/2⌋ = 2. Detection alone can detect up to 4 errors.'},
    takeaway: 'Minimum distance gives guarantees. Perfect meets the packing bound; MDS meets the Singleton bound.'
  },
  {
    id: 'operations', part: 'Making data resilient', title: 'Duals & changing a code', minutes: 10,
    subtitle: 'Build related codes from one you already understand.', source: 'Coding Theory — Equivalent, dual, punctured, and extended codes',
    goal: 'Understand orthogonality, dual dimension, puncturing, and extension.',
    sections: [
      ['The dual code', 'The <b>dot product</b> of two vectors is the sum of their position-by-position products. Two vectors are <b>orthogonal</b> when this sum is zero in the field. The <b>dual code</b> C⊥ contains all vectors orthogonal to every codeword of C. If C has dimension k and length n, C⊥ has dimension n − k. The rows of H form a basis for the dual.'],
      ['Equivalent codes', 'Permuting coordinates, and multiplying individual coordinates by nonzero field values, preserves length, dimension, and Hamming distances. Codes related this way are <b>equivalent</b>. In binary there is no nontrivial nonzero rescaling because the only nonzero scalar is 1.'],
      ['Remove or add coordinates', '<b>Puncturing</b> deletes a selected coordinate from every word. Length decreases by 1; dimension may stay the same or decrease, and distance may stay the same or decrease by 1. <b>Extending</b> can add a parity coordinate. A binary overall parity bit makes each extended word have even weight; this may increase minimum distance.']
    ],
    formula: 'dim(C⊥) = n − k     u · v = Σ uᵢvᵢ',
    legend: [['⊥', 'Orthogonal; C⊥ is the dual code.'], ['dim', 'Dimension: number of basis vectors.'], ['·', 'Dot product when used between vectors.']],
    example: {title: 'Dual of the repetition code', steps: ['C = {000,111}, with length 3 and dimension 1.', 'A vector v is in C⊥ if v · 111 = 0, meaning its three bits sum to 0 modulo 2.', 'The dual is {000,011,101,110}, the even-parity code.', 'Its dimension is 3 − 1 = 2, so it contains 2² = 4 words.', 'Puncturing 000/111 gives 00/11. Adding a parity bit to 000/111 gives 0000/1111.']},
    check: {prompt: 'A length-7 code has dimension 4. What is the dimension of its dual?', answer: '3', hint: 'Subtract the original dimension from the length.', explanation: 'dim(C⊥) = 7 − 4 = 3.'},
    takeaway: 'The dual holds the checking equations. Puncturing and extension change the balance between length and protection.'
  },
  {
    id: 'extensions', part: 'Making data resilient', title: 'Polynomials & extension fields', minutes: 15,
    subtitle: 'Build fields with 4, 8, or 9 elements correctly.', source: 'Coding Theory — Finite-field extensions; cryptography notes §7.8',
    goal: 'Calculate in GF(4) and explain the role of an irreducible polynomial.',
    sections: [
      ['A polynomial is a short rule', 'A <b>polynomial</b>, such as x² + x + 1, adds powers of x with coefficients. Its <b>degree</b> is the highest power with a nonzero coefficient. A <b>root</b> is an input making it zero. A polynomial is <b>irreducible</b> over a field if it cannot factor into lower-degree nonconstant polynomials there. For degree 2 or 3, no root in that field means irreducible. This shortcut does not hold for every higher degree.'],
      ['Adjoin a symbolic root', 'Choose an irreducible polynomial f of degree r over GF(p). Introduce a symbol α satisfying f(α) = 0. Represent elements by polynomials in α of degree below r, and reduce higher powers using that equation. This constructs GF(pʳ). Formally it is GF(p)[x]/(f(x)): polynomial arithmetic with remainders after division by f.'],
      ['Why integers modulo 4 fail', 'GF(4) has four elements, but it is not ℤ/4ℤ. In ℤ/4ℤ, 2 × 2 = 0, so 2 has no inverse. In a field, a product of two nonzero values cannot be zero. For GF(4), use GF(2) coefficients and the irreducible polynomial x² + x + 1. The elements are 0, 1, α, α + 1.']
    ],
    formula: 'α² + α + 1 = 0     α² = α + 1  in GF(4)',
    legend: [['α', 'Greek alpha: an adjoined root, not an ordinary real number.'], ['GF(p)[x]', 'Polynomials whose coefficients belong to GF(p).'], ['deg f', 'Degree of polynomial f.'], ['/(f)', 'Reduce polynomials modulo f.']],
    example: {title: 'Find the inverse of α in GF(4)', steps: ['Start from α² = α + 1.', 'Multiply α by α + 1: α(α + 1) = α² + α.', 'Replace α²: (α + 1) + α.', 'Over GF(2), α + α = 0, leaving 1.', 'Therefore α⁻¹ = α + 1. This is symbolic field arithmetic, not integer arithmetic modulo 4.']},
    check: {prompt: 'In this GF(4), what is α × (α + 1)?', options: ['1', '0', 'α'], answer: 0, hint: 'Expand, replace α² with α + 1, then cancel two copies of α.', explanation: 'α² + α = (α + 1) + α = 1 in characteristic 2.'},
    takeaway: 'Prime-power fields need polynomial construction. A prime-power modulus alone does not create a field.'
  },
  {
    id: 'cyclic', part: 'Making data resilient', title: 'Cyclic codes & generator polynomials', minutes: 13,
    subtitle: 'Rotate a valid word and remain inside the code.', source: 'Coding Theory — Cyclic Codes',
    goal: 'Translate a word into a polynomial and read its cyclic generator.',
    sections: [
      ['A word becomes a polynomial', 'Use c = (c₀,…,cₙ₋₁) ↔ c(x) = c₀ + c₁x + … + cₙ₋₁xⁿ⁻¹. We list the constant coefficient first. A <b>cyclic code</b> is a linear code closed under a one-position circular shift. Multiplying by x and reducing modulo xⁿ − 1 makes the last coordinate wrap to the beginning.'],
      ['One polynomial generates the code', 'In GF(q)[x]/(xⁿ − 1), a cyclic code is an <b>ideal</b>: it is closed under addition and multiplication by any ring element. Its unique monic generator g(x) divides xⁿ − 1. Monic means leading coefficient 1. The code consists of multiples of g reduced modulo xⁿ − 1. Dimension k = n − deg g.'],
      ['Matrices and the dual', 'A generator matrix has coefficient rows for g, xg, …, xᵏ⁻¹g. Set h(x) = (xⁿ − 1)/g(x). A reciprocal of h (reverse its coefficients, then normalize) generates the dual cyclic code. Shifts of its coefficients supply parity-check rows. The exact shift convention depends on how coordinates are ordered.']
    ],
    formula: 'g(x) divides xⁿ − 1     k = n − deg g',
    legend: [['c(x)', 'Polynomial representation of a word.'], ['g(x)', 'Generator polynomial.'], ['h(x)', 'Check polynomial (xⁿ − 1)/g(x).'], ['monic', 'Leading coefficient equals 1.']],
    example: {title: 'The binary length-3 repetition code', steps: ['Over GF(2), choose g(x) = 1 + x + x².', '(x + 1)g(x) = x³ + 1 = x³ − 1 in characteristic 2.', 'Thus g divides x³ − 1. Its degree is 2, so k = 3 − 2 = 1.', 'The only message coefficients are 0 and 1, giving 000 and 111.', 'Rotating either word leaves the same word, so the code is cyclic.']},
    check: {prompt: 'A length-7 cyclic code has generator degree 3. What is its dimension?', answer: '4', hint: 'Use k = n − deg g.', explanation: 'k = 7 − 3 = 4.'},
    takeaway: 'Rotation becomes multiplication by x. Generator degree tells you the code dimension.'
  },
  {
    id: 'hamming', part: 'Making data resilient', title: 'Hamming codes: fix one bit', minutes: 14,
    subtitle: 'Give every bit its own syndrome address.', source: 'Coding Theory — Hamming codes; cryptography notes §7.9', lab: 'hamming',
    goal: 'Locate and repair a single flipped bit in a [7,4,3]₂ code.',
    sections: [
      ['Distinct columns identify positions', 'For the binary Hamming [7,4,3] code, take H whose columns are the binary representations of positions 1 through 7. Three parity checks produce a three-bit syndrome. If only bit j changes, the syndrome equals column j and identifies its location. This is guaranteed for one error; multiple errors can cause a misleading syndrome.'],
      ['Our convention', 'In this book, check 1 covers positions 1,3,5,7; check 2 covers 2,3,6,7; check 4 covers 4,5,6,7. Add the failed-check labels (1,2,4) to get the position. Parity bits occupy positions 1,2,4; data bits occupy 3,5,6,7. All parity sums are even.'],
      ['The whole Hamming family', 'Over GF(q), choose one representative from every one-dimensional subspace of GF(q)ʳ as an H column. Then n = (qʳ − 1)/(q − 1), k = n − r, d = 3. Hamming codes are perfect one-error-correcting codes. Binary Hamming codes can be arranged in cyclic form. An overall parity extension gives binary distance 4.']
    ],
    formula: 'error position = s₁ + 2s₂ + 4s₄',
    legend: [['s₁, s₂, s₄', 'The binary results of checks labeled 1, 2, and 4.'], ['r', 'Number of independent parity checks in the family formula.'], ['q', 'Size of the finite-field alphabet.']],
    example: {title: 'Repair a flip at position 6', steps: ['Encode data 1011 in positions 3,5,6,7. The even-parity codeword is 0110011.', 'Flip position 6. The received word becomes 0110001.', 'Check 1 sums positions 1,3,5,7: 0+1+0+1 = 0 modulo 2.', 'Check 2 gives 1+1+0+1 = 1 modulo 2; check 4 gives 0+0+0+1 = 1.', 'The position is 0 + 2×1 + 4×1 = 6. Flip bit 6 back and recover data 1011.']},
    check: {prompt: 'The failed check labels are 1 and 4; check 2 passes. Which bit should you flip if exactly one bit is wrong?', answer: '5', hint: 'Add the labels of the failed checks.', explanation: '1 + 4 = 5, so the single-error location is position 5.'},
    takeaway: 'Hamming columns are addresses. The syndrome locates one bit, provided the one-error assumption holds.'
  },
  {
    id: 'families', part: 'Making data resilient', title: 'Hadamard, extended & Golay codes', minutes: 12,
    subtitle: 'Read the parameters before tackling the construction.', source: 'Coding Theory — Hadamard and binary/ternary Golay codes',
    goal: 'Compare named code families through length, dimension, distance, and correction.',
    sections: [
      ['Hadamard codes from simple functions', 'The binary first-order Reed–Muller (Hadamard) code evaluates every affine function b + u·x on all x in GF(2)ʳ. It has parameters [2ʳ,r+1,2ʳ⁻¹]₂. The constant b and r entries of u give r+1 independent choices. A nonconstant affine function is 1 on half the inputs.'],
      ['Puncturing and duality', 'Removing the coordinate x = 0 gives [2ʳ−1,r+1,2ʳ⁻¹−1]₂. For r = 3 this is [7,4,3]₂. The dual of the length-2ʳ Hadamard code is the extended Hamming code [2ʳ,2ʳ−r−1,4]₂ for r ≥ 3. The notes also use a particular half-length coordinate selection; that is a different puncturing from removing one coordinate.'],
      ['Golay codes', 'The binary Golay code is [23,12,7]₂; its parity extension is [24,12,8]₂. The ternary Golay code is [11,6,5]₃; its extension is [12,6,6]₃. The unextended versions are perfect and can be represented cyclically. The notes construct them with special cyclic and complementary rows; the key first step is to understand their parameters and field arithmetic.']
    ],
    formula: 'binary Golay: [23,12,7]₂     ternary Golay: [11,6,5]₃',
    legend: [['b + u·x', 'An affine function: a constant plus a dot product.'], ['binary / ternary', 'Symbols from GF(2) / GF(3).'], ['extended', 'A code with an added parity coordinate in these examples.']],
    example: {title: 'What binary Golay guarantees', steps: ['[23,12,7]₂ transmits 23 bits for 12 independent message bits.', 'It contains 2¹² = 4096 codewords.', 'Its distance 7 permits unique correction of floor((7−1)/2) = 3 bits.', 'The extension has distance 8, so it still guarantees correction of 3 bits, while detection alone increases from 6 to 7 bits.']},
    check: {prompt: 'How many symbol errors can the [11,6,5]₃ ternary Golay code always correct?', answer: '2', hint: 'The correction formula depends on distance, not whether the alphabet is binary or ternary.', explanation: 'floor((5−1)/2) = 2 symbol errors.'},
    takeaway: 'Code parameters give practical guarantees before you learn a family’s detailed construction.'
  },
  {
    id: 'rs-bch', part: 'Making data resilient', title: 'Reed–Solomon & BCH codes', minutes: 16,
    subtitle: 'Polynomials become powerful error-correcting tools.', source: 'Coding Theory — Reed–Solomon and BCH codes',
    goal: 'Evaluate a small Reed–Solomon word and read a BCH designed-distance guarantee.',
    sections: [
      ['Reed–Solomon: evaluate a message polynomial', 'Use a finite field GF(q), n distinct evaluation points α₁,…,αₙ, and polynomials of degree below k. The codeword is (f(α₁),…,f(αₙ)). It has parameters [n,k,n−k+1]q, so it meets the Singleton bound. A nonzero polynomial of degree at most k−1 has at most k−1 roots; this explains the distance.'],
      ['Its generator matrix', 'Rows are evaluations of 1,x,…,xᵏ⁻¹. This is a <b>Vandermonde</b> pattern. Distinct evaluation points make the relevant square submatrices invertible. Extra evaluations provide redundancy. Reed–Solomon protects field symbols, which may each represent several bits.'],
      ['BCH: choose roots that force distance', 'A <b>BCH code</b> is cyclic. Choose an element α of order n in an extension field GF(qᵐ). For designed distance δ, choose δ−1 consecutive powers αᶜ,…,αᶜ⁺δ⁻². Let g be the least common multiple of their <b>minimal polynomials</b> over GF(q). A minimal polynomial is the smallest monic polynomial over the base field with that element as a root. Then k = n − deg g and actual distance d ≥ δ.'],
      ['Special cases', '<b>Primitive</b> means n = qᵐ−1; <b>narrow-sense</b> means c = 1. When m = 1 the relevant minimal polynomials are linear and the construction meets the Singleton bound. The primitive length q−1 case is equivalent to the corresponding Reed–Solomon construction. Designed distance is a proven lower bound, not automatically the exact distance.']
    ],
    formula: 'RS: d = n − k + 1     BCH: d ≥ δ, k = n − deg g',
    legend: [['f(αᵢ)', 'Evaluate polynomial f at the i-th field point.'], ['δ', 'Greek delta: the designed minimum-distance lower bound.'], ['m', 'Extension degree in GF(qᵐ); not a message here.'], ['lcm', 'Least common multiple of the selected minimal polynomials.']],
    example: {title: 'An RS word over GF(5)', steps: ['Let n = 4, k = 2, and evaluation points 0,1,2,3.', 'Message coefficients (1,2) define f(x) = 1 + 2x.', 'f(0)=1; f(1)=3; f(2)=5≡0; f(3)=7≡2 modulo 5.', 'The codeword is (1,3,0,2). Parameters are [4,2,3]₅.', 'It guarantees correction of one symbol error. The coefficients carry the message; the evaluations are the transmitted word.']},
    check: {prompt: 'An RS code has length 7 and dimension 3. What is its minimum distance?', answer: '5', hint: 'RS meets d = n − k + 1.', explanation: 'd = 7 − 3 + 1 = 5, which permits correction of 2 symbol errors.'},
    takeaway: 'RS evaluates polynomials. BCH selects polynomial roots to guarantee a chosen distance.'
  },
  {
    id: 'curves-codes', part: 'Making data resilient', title: 'Curve codes, Goppa & divisors', minutes: 14,
    subtitle: 'A first map of the advanced topics in your notes.', source: 'Cryptography notes §7 — Hyperelliptic/Goppa codes and Exercises 6,9',
    goal: 'Explain evaluation on curves and read a divisor’s degree.',
    sections: [
      ['From a line to a curve', 'Reed–Solomon evaluates polynomials at field points. <b>Algebraic-geometric codes</b> generalize this: evaluate suitable functions at selected points of a curve over a finite field. <b>Genus</b> is a measure of a curve’s geometric complexity; elliptic curves have genus 1. A hyperelliptic curve can be written y² = f(x) with suitable square-free f in odd characteristic; degrees 5 or 6 give genus 2.'],
      ['A divisor is a formal list with integer weights', 'A <b>divisor</b> D = Σ nₚP records curve points P with integer coefficients nₚ, which may be negative. Its degree is the weighted total; for rational points, deg D = Σ nₚ. For non-rational closed points the field degrees also enter. This is formal bookkeeping, not ordinary point-coordinate addition.'],
      ['Functions, equivalence and the Jacobian', 'A <b>principal divisor</b> div(f) records a function’s zeros positively and poles negatively, with their multiplicities. Its degree is zero. Two divisors are equivalent when their difference is principal. Degree-zero divisors modulo this equivalence form the <b>Jacobian</b>, a group generalizing the elliptic-curve point group. The advanced exercises reduce divisors by interpolating functions and accounting for intersections.'],
      ['Goppa constructions', 'The supplied notes introduce codes from algebraic curves and divisor spaces, often called algebraic-geometric Goppa codes. A function space L(D) allows poles bounded by D; evaluation at distinct points outside those poles gives a linear code. A separate classical Goppa construction uses a polynomial and a field support with parity-check conditions. Both names appear in coding literature; their constructions should not be confused.']
    ],
    formula: 'D = P + Q − 2O     deg D = 1 + 1 − 2 = 0',
    legend: [['D', 'A divisor; a formal integer combination of points.'], ['div(f)', 'Zeros minus poles of a nonzero rational function.'], ['L(D)', 'Functions whose poles are bounded by D, together with the zero function.'], ['J(C)', 'The Jacobian group of curve C.']],
    example: {title: 'Read a degree-zero divisor', steps: ['Assume P, Q and O are rational points on the curve.', 'D = P + Q − 2O lists weights +1, +1, and −2.', 'Add the weights: deg D = 0.', 'Changing D by a principal divisor preserves its degree and its class in the Jacobian.', 'The expression does not mean subtract coordinate pairs. Full reduction requires the curve’s algebra.']},
    check: {prompt: 'For rational points, what is deg(2P + Q − 3O)?', answer: '0', hint: 'Add the integer coefficients, including the negative one.', explanation: '2 + 1 − 3 = 0. This is a degree-zero divisor.'},
    takeaway: 'Curve codes evaluate functions. Divisors control poles and organize the advanced curve arithmetic.'
  },
  {
    id: 'revision', part: 'Bring it together', title: 'Your first exam-style walkthrough', minutes: 15,
    subtitle: 'Connect the ideas, one justified step at a time.', source: 'Original revision exercises aligned to both supplied course notes',
    goal: 'Choose the right tool and show why each step is valid.',
    sections: [
      ['A reliable answer structure', 'First identify the problem: remainder, inverse, encryption, distance, encoding, or decoding. List the given values and the field or modulus. State the formula and its conditions. Substitute values, show intermediate steps, then check your answer. A numeric answer without the field can mean the wrong thing.'],
      ['For cryptography questions', 'For RSA: compute n and λ, check gcd(e,λ)=1, find d, and use modular powers. For Diffie–Hellman: keep secret exponents separate from public values. For signatures: say who signs and whose public key verifies. For an attack: explain the property exploited, such as a small key space or a collision.'],
      ['For coding questions', 'Read [n,k,d]q carefully. Check G has rank k and GHᵀ=0 in GF(q). Compute the syndrome from the received word. State the error assumption before correcting. For a cyclic code, confirm g divides xⁿ−1 and calculate k from its degree. For BCH, distinguish designed δ from actual d.'],
      ['How to use the original exercises', 'Your cryptography notes finish with nine exercises covering RSA, curve arithmetic, finite fields, cyclic/Hamming codes, BCH, and signature verification. This companion builds the prerequisites and supplies smaller original examples. Use the notes for the full exercise statements and detailed advanced constructions. The Practice Lab below lets you rehearse the core computations before attempting those larger exercises.']
    ],
    formula: 'identify → state conditions → calculate → verify',
    legend: [['→', 'The next step in the reasoning process.'], ['GF(q)', 'The field in which the code’s arithmetic happens.'], ['mod n', 'The modulus for the cryptographic calculation.']],
    example: {title: 'Analyze a [7,4,3]₂ code completely', steps: ['Length n=7, dimension k=4, alphabet size q=2, distance d=3.', 'Count codewords: 2⁴=16. Rate: 4/7.', 'Unique correction: floor((3−1)/2)=1. Detection alone: 3−1=2.', 'A full-rank parity-check matrix has n−k=3 rows and 7 columns.', 'If a single error gives syndrome column 5, correct position 5. With multiple errors, that same correction may be wrong.']},
    check: {prompt: 'For a [7,4,3]₂ code, how many independent rows does a full-rank parity-check matrix have?', answer: '3', hint: 'A full-rank H has n − k independent rows.', explanation: '7 − 4 = 3 independent parity checks. Its size is 3 × 7.'},
    takeaway: 'A good solution names the setting, justifies the rule, shows the arithmetic, and checks the result.'
  }
];
