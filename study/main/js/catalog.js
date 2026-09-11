/* Brights course catalog — data + rendering, search and filters. */

var CATALOG = [
  {
    "subject": "Math",
    "color": "linear-gradient(160deg, #8ecdf2, #4b93d1)",
    "courses": [
      {
        "n": "Kindergarten Math",
        "g": "Grade K",
        "b": "K-2",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "A first systematic course in number, quantity, shape, comparison, and measurement.",
        "s1": [
          "Counting and cardinality",
          "Numbers 0–20",
          "Comparing groups",
          "Composing and decomposing numbers",
          "Addition stories"
        ],
        "s2": [
          "Subtraction stories",
          "Making ten",
          "Numbers to 100",
          "Two- and three-dimensional shapes",
          "Measurement, patterns and classifying data"
        ]
      },
      {
        "n": "Grade 1 Math",
        "g": "Grade 1",
        "b": "K-2",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Builds addition and subtraction fluency within 20 and a strong understanding of tens and ones.",
        "s1": [
          "Addition within 10",
          "Subtraction within 10",
          "Addition and subtraction within 20",
          "Fact families and unknowns",
          "Place value to 120",
          "Comparing two-digit numbers"
        ],
        "s2": [
          "Adding and subtracting tens",
          "One- and two-step word problems",
          "Length and non-standard measurement",
          "Time to the hour and half hour",
          "Data, picture graphs and tally charts",
          "Shapes, halves and fourths"
        ]
      },
      {
        "n": "Grade 2 Math",
        "g": "Grade 2",
        "b": "K-2",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Develops place value to 1,000, multi-digit computation, measurement, time, money, and early fraction concepts.",
        "s1": [
          "Place value to 1,000",
          "Comparing and ordering numbers",
          "Addition within 100",
          "Subtraction within 100",
          "Addition and subtraction to 1,000",
          "Mental strategies and estimation"
        ],
        "s2": [
          "Equal groups and arrays",
          "Money and making change",
          "Time to five minutes",
          "Length in customary and metric units",
          "Bar graphs and line plots",
          "Shapes and equal shares"
        ]
      },
      {
        "n": "Grade 3 Math",
        "g": "Grade 3",
        "b": "3-5",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Centers on multiplication and division, fractions on a number line, area, and perimeter.",
        "s1": [
          "Multiplication concepts",
          "Division concepts",
          "Multiplication and division facts",
          "Properties and patterns",
          "Multi-step problems",
          "Place value, rounding and estimation",
          "Addition and subtraction fluency"
        ],
        "s2": [
          "Fractions on a number line",
          "Equivalent and comparing fractions",
          "Area",
          "Perimeter",
          "Time intervals",
          "Mass and liquid volume",
          "Scaled graphs",
          "Quadrilaterals and geometric reasoning"
        ]
      },
      {
        "n": "Grade 4 Math",
        "g": "Grade 4",
        "b": "3-5",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Covers multi-digit arithmetic, fraction operations, decimals, and angle geometry.",
        "s1": [
          "Multi-digit place value",
          "Addition and subtraction to one million",
          "One-digit multiplication",
          "Two-digit multiplication",
          "Division with remainders",
          "Factors, multiples and primes",
          "Multi-step problems"
        ],
        "s2": [
          "Equivalent and ordered fractions",
          "Adding and subtracting fractions",
          "Multiplying fractions by whole numbers",
          "Decimal notation to hundredths",
          "Angles and angle measure",
          "Lines, symmetry and classification",
          "Measurement conversion",
          "Area, perimeter and line plots"
        ]
      },
      {
        "n": "Grade 5 Math",
        "g": "Grade 5",
        "b": "3-5",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Covers decimal operations, fraction multiplication and division, volume, and the coordinate plane.",
        "s1": [
          "Decimal place value",
          "Decimal addition and subtraction",
          "Decimal multiplication",
          "Decimal division",
          "Powers of ten",
          "Numerical expressions",
          "Multi-digit multiplication and division"
        ],
        "s2": [
          "Fractions with unlike denominators",
          "Multiplying fractions",
          "Dividing unit fractions",
          "Measurement conversion",
          "Volume",
          "Coordinate plane",
          "Classifying shapes",
          "Fractional line plots"
        ]
      },
      {
        "n": "Grade 6 Math",
        "g": "Grade 6",
        "b": "6-8",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Moves from arithmetic toward algebraic thinking through ratios, negative numbers, expressions, and equations.",
        "s1": [
          "Ratios and ratio reasoning",
          "Unit rates",
          "Percentages",
          "Fraction division",
          "Decimal fluency",
          "Exponents and order of operations",
          "Negative numbers and absolute value"
        ],
        "s2": [
          "Variables and expressions",
          "One-step equations",
          "Inequalities",
          "Coordinate plane and polygons",
          "Area and surface area",
          "Volume",
          "Statistical distributions",
          "Measures of center and variability"
        ]
      },
      {
        "n": "Grade 7 Math",
        "g": "Grade 7",
        "b": "6-8",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Covers proportional relationships, rational numbers, equations, geometry, and probability.",
        "s1": [
          "Proportional relationships",
          "Constant of proportionality",
          "Scale drawings",
          "Percent increase and decrease",
          "Rational-number operations",
          "Expressions and linear equations",
          "Inequalities"
        ],
        "s2": [
          "Circles",
          "Angle relationships",
          "Surface area and volume",
          "Probability models",
          "Compound events",
          "Random sampling",
          "Comparing populations and statistical inference"
        ]
      },
      {
        "n": "Grade 8 Math",
        "g": "Grade 8",
        "b": "6-8",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Uses linear functions, systems, transformations, and the Pythagorean theorem to prepare students for Algebra I.",
        "s1": [
          "Exponents and scientific notation",
          "Roots and irrational numbers",
          "Linear equations",
          "Slope and rate of change",
          "Graphing linear relationships",
          "Systems of equations",
          "Functions and function comparison"
        ],
        "s2": [
          "Transformations and congruence",
          "Dilations and similarity",
          "Pythagorean theorem",
          "Volume of cylinders, cones and spheres",
          "Scatter plots",
          "Lines of fit",
          "Two-way tables"
        ]
      },
      {
        "n": "Pre-Algebra",
        "g": "Recommended grades 7–9",
        "b": "6-8,9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Rebuilds arithmetic prerequisites and prepares students for Algebra I.",
        "s1": [
          "Whole-number operations",
          "Factors and multiples",
          "Fraction and decimal fluency",
          "Ratios, rates and proportions",
          "Percent applications",
          "Integers and rational numbers",
          "Exponents and roots"
        ],
        "s2": [
          "Algebraic expressions",
          "Properties of operations",
          "Equations",
          "Inequalities",
          "Coordinate plane",
          "Linear patterns",
          "Functions",
          "Introductory systems",
          "Modeling and multi-step problems"
        ]
      },
      {
        "n": "Algebra I",
        "g": "Recommended grades 8–10",
        "b": "6-8,9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "The core high-school algebra course, developing linear, exponential, and quadratic relationships through functions and modeling.",
        "s1": [
          "Algebraic foundations",
          "Linear equations",
          "Linear inequalities",
          "Units and modeling",
          "Linear functions and graphs",
          "Forms of linear equations",
          "Systems of equations",
          "Systems of inequalities"
        ],
        "s2": [
          "Function notation and domain",
          "Sequences",
          "Absolute-value and piecewise functions",
          "Exponent rules and radicals",
          "Exponential growth and decay",
          "Polynomial operations and factoring",
          "Quadratic equations",
          "Quadratic functions",
          "Bivariate data and lines of fit"
        ]
      },
      {
        "n": "Geometry",
        "g": "Recommended grades 9–11",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Transformation-based geometry with proof, trigonometry, and coordinate methods.",
        "s1": [
          "Definitions, postulates and proof",
          "Transformations",
          "Congruence",
          "Triangle relationships",
          "Similarity and dilation",
          "Right-triangle trigonometry",
          "Quadrilaterals"
        ],
        "s2": [
          "Polygons",
          "Circles, arcs and sectors",
          "Coordinate geometry",
          "Geometric constructions",
          "Area",
          "Surface area and volume",
          "Geometric probability"
        ]
      },
      {
        "n": "Algebra II",
        "g": "Recommended grades 10–12",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Covers polynomial, rational, radical, exponential, and logarithmic function families.",
        "s1": [
          "Function transformations",
          "Polynomial arithmetic",
          "Factoring higher-degree polynomials",
          "Polynomial division",
          "Polynomial functions",
          "Rational expressions and equations",
          "Radical functions and rational exponents",
          "Complex numbers"
        ],
        "s2": [
          "Exponential models",
          "Logarithms",
          "Inverse functions",
          "Sequences and series",
          "Introductory trigonometry",
          "Matrices and systems",
          "Probability models",
          "Modeling with functions"
        ]
      },
      {
        "n": "Precalculus with Trigonometry",
        "g": "Recommended grades 11–12",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Builds the full function toolkit and trigonometry foundation needed before Calculus I.",
        "s1": [
          "Function composition and inverses",
          "Polynomial functions",
          "Rational functions",
          "Exponential and logarithmic models",
          "Radians and the unit circle",
          "Trigonometric graphs",
          "Identities and equations"
        ],
        "s2": [
          "Laws of sines and cosines",
          "Vectors",
          "Polar and parametric equations",
          "Matrices and systems",
          "Conic sections",
          "Sequences and series",
          "Combinatorics and probability",
          "Introduction to limits"
        ]
      },
      {
        "n": "Statistics and Probability",
        "g": "Grades 9–12",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Covers data displays, study design, probability, and statistical inference with interpretation in context.",
        "e": true,
        "s1": [
          "Categorical data",
          "Quantitative data",
          "Center and spread",
          "Normal distributions",
          "Scatter plots and correlation",
          "Regression",
          "Sampling methods",
          "Experiments and observational studies"
        ],
        "s2": [
          "Probability rules",
          "Conditional probability",
          "Random variables",
          "Binomial and geometric models",
          "Sampling distributions",
          "Confidence intervals",
          "Significance tests",
          "Comparing groups",
          "Chi-square reasoning"
        ]
      },
      {
        "n": "Calculus I: Limits, Derivatives & Integrals",
        "g": "Recommended grades 11–12",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "A first single-variable calculus course covering limits, derivatives, integrals, and their central applications. It does not claim to cover the entire field of calculus.",
        "s1": [
          "Limits and continuity",
          "Definition of derivative",
          "Differentiation rules",
          "Chain rule",
          "Implicit and inverse differentiation",
          "Related rates",
          "Curve analysis",
          "Optimization"
        ],
        "s2": [
          "Riemann sums",
          "Definite integrals",
          "Fundamental theorem of calculus",
          "Antiderivatives and substitution",
          "Differential equations",
          "Area between curves",
          "Volumes of revolution",
          "Cumulative applications"
        ]
      },
      {
        "n": "Financial Mathematics",
        "g": "Grades 8–12",
        "b": "6-8,9-12",
        "p": "Semester $129",
        "fmt": "Semester",
        "d": "Applies mathematics to income, banking, debt, insurance, and investing.",
        "e": true,
        "u": [
          "Income, paychecks and taxes",
          "Banking and account management",
          "Budgeting and emergency funds",
          "Simple and compound interest",
          "Credit scores and credit cards",
          "Loans and repayment",
          "Insurance and risk",
          "Investing and retirement",
          "Consumer protection and financial plan"
        ]
      }
    ]
  },
  {
    "subject": "ELA & Languages",
    "color": "linear-gradient(160deg, #9f7bec, #7048c9)",
    "courses": [
      {
        "n": "Early Literacy",
        "g": "Grades K–2",
        "b": "K-2",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "An integrated foundational reading, oral language, early writing, and comprehension course with distinct Kindergarten, Grade 1, and Grade 2 pathways.",
        "s1": [
          "Print concepts",
          "Phonological awareness",
          "Letter–sound relationships",
          "Blending and segmenting",
          "High-frequency words",
          "Oral language and vocabulary"
        ],
        "s2": [
          "Decoding increasingly complex words",
          "Reading fluency",
          "Story elements and retelling",
          "Informational-text features",
          "Sentence construction",
          "Early opinion, narrative and informative writing"
        ]
      },
      {
        "n": "Grade 3 English Language Arts",
        "g": "Grade 3",
        "b": "3-5",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Moves students from learning to read toward reading to learn, with reading, language, and writing taught together.",
        "s1": [
          "Reading fluency and morphology",
          "Story elements",
          "Character and plot",
          "Main idea and details",
          "Text features",
          "Vocabulary in context",
          "Sentence structure and conventions"
        ],
        "s2": [
          "Theme and point of view",
          "Comparing texts",
          "Opinion writing",
          "Informative writing",
          "Narrative writing",
          "Research from short sources",
          "Speaking, listening and presentation"
        ]
      },
      {
        "n": "Grade 4 English Language Arts",
        "g": "Grade 4",
        "b": "3-5",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Develops close reading, summary, text structure, multi-paragraph writing, and evidence use.",
        "s1": [
          "Summarizing literary text",
          "Theme",
          "Character and point of view",
          "Poetry and figurative language",
          "Informational text structures",
          "Academic vocabulary",
          "Grammar and sentence variety"
        ],
        "s2": [
          "Integrating information from two sources",
          "Author's reasons and evidence",
          "Opinion essay",
          "Informative essay",
          "Narrative craft",
          "Research and note-taking",
          "Discussion and oral presentation"
        ]
      },
      {
        "n": "Grade 5 English Language Arts",
        "g": "Grade 5",
        "b": "3-5",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Develops text analysis, source comparison, argument, and research-based writing.",
        "s1": [
          "Theme and text evidence",
          "Character development",
          "Poetry and drama",
          "Point of view",
          "Main ideas across sections",
          "Text structure and author's craft",
          "Grammar, usage and vocabulary"
        ],
        "s2": [
          "Comparing multiple texts",
          "Claims and evidence",
          "Argument writing",
          "Explanatory writing",
          "Narrative technique",
          "Research and source evaluation",
          "Multimedia presentation and discussion"
        ]
      },
      {
        "n": "Grade 6 English Language Arts",
        "g": "Grade 6",
        "b": "6-8",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "The first middle-school ELA course, centered on close reading, evidence-based analysis, and structured composition.",
        "s1": [
          "Close reading and annotation",
          "Plot and character change",
          "Theme",
          "Poetry and figurative language",
          "Central idea",
          "Text structure",
          "Vocabulary and morphology"
        ],
        "s2": [
          "Author's purpose and point of view",
          "Argument and evidence",
          "Literary analysis paragraph",
          "Informative essay",
          "Narrative writing",
          "Research and citation foundations",
          "Speaking and collaborative discussion"
        ]
      },
      {
        "n": "Grade 7 English Language Arts",
        "g": "Grade 7",
        "b": "6-8",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Deepens analysis of author craft, comparison across media, and argument built from credible sources.",
        "s1": [
          "Evidence and inference",
          "Theme development",
          "Character and conflict",
          "Poetry and sound",
          "Drama",
          "Nonfiction organization",
          "Language, connotation and tone"
        ],
        "s2": [
          "Comparing print and media",
          "Evaluating claims",
          "Argument essay",
          "Explanatory synthesis",
          "Narrative perspective",
          "Research and source credibility",
          "Debate and presentation"
        ]
      },
      {
        "n": "Grade 8 English Language Arts",
        "g": "Grade 8",
        "b": "6-8",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Prepares students for high-school English through rhetorical analysis, synthesis, and sustained writing.",
        "s1": [
          "Complex narrative analysis",
          "Theme and motif",
          "Author's craft",
          "Poetry and drama",
          "Rhetoric in nonfiction",
          "Conflicting sources",
          "Vocabulary, grammar and style"
        ],
        "s2": [
          "Evaluating reasoning and evidence",
          "Literary analysis essay",
          "Argument with counterclaim",
          "Informative synthesis",
          "Research project",
          "Revision and editing",
          "Speech and seminar discussion"
        ]
      },
      {
        "n": "Grade 9 English: Literature & Composition (English I)",
        "g": "Typical grade 9",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Introduces high-school literary analysis and thesis-driven composition.",
        "s1": [
          "Close reading methods",
          "Short fiction",
          "The novel",
          "Poetry",
          "Drama",
          "Grammar and sentence craft"
        ],
        "s2": [
          "Literary analysis",
          "Rhetorical analysis",
          "Argument writing",
          "Informative synthesis",
          "Research and citation",
          "Speech and multimedia presentation"
        ]
      },
      {
        "n": "Grade 10 English: World Literature & Writing (English II)",
        "g": "Typical grade 10",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Studies world literature through historical and cultural context, comparative analysis, and academic writing.",
        "s1": [
          "Epic and oral traditions",
          "Classical drama",
          "Global short fiction",
          "Poetry across cultures",
          "The world novel",
          "Context, translation and perspective"
        ],
        "s2": [
          "Comparative literary analysis",
          "Rhetoric across cultures",
          "Synthesis from multiple sources",
          "Argument and counterargument",
          "Research writing",
          "Seminar and presentation"
        ]
      },
      {
        "n": "Grade 11 English: American Literature & Rhetoric (English III)",
        "g": "Typical grade 11",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Studies American literature and public rhetoric from founding texts to contemporary voices.",
        "s1": [
          "Indigenous and colonial voices",
          "Founding rhetoric",
          "Romanticism and transcendentalism",
          "Realism and regionalism",
          "Poetry and identity",
          "Researching historical context"
        ],
        "s2": [
          "Modernism",
          "Harlem Renaissance",
          "Postwar literature",
          "Contemporary voices",
          "Rhetorical analysis",
          "Evidence-based argument",
          "Research paper and oral defense"
        ]
      },
      {
        "n": "Grade 12 English: Advanced Composition & Research (English IV)",
        "g": "Typical grade 12",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Develops college- and career-oriented reading, rhetoric, research, and independent composition.",
        "s1": [
          "Advanced nonfiction",
          "British and global texts",
          "Rhetorical situation",
          "Style and voice",
          "Logic and fallacies",
          "Academic synthesis"
        ],
        "s2": [
          "Research question and proposal",
          "Source evaluation",
          "Annotated bibliography",
          "Extended research paper",
          "Revision and publication",
          "Personal and professional writing",
          "Capstone presentation"
        ]
      },
      {
        "n": "English Language Development K–2",
        "g": "Grades K–2",
        "b": "K-2",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Develops classroom English and foundational literacy through age-appropriate Entering, Emerging, and Developing pathways.",
        "s1": [
          "Listening and responding",
          "Classroom language",
          "Everyday vocabulary",
          "Sounds and pronunciation",
          "Oral sentences",
          "Songs, stories and picture talk"
        ],
        "s2": [
          "Foundational reading",
          "Questions and answers",
          "Describing people, places and events",
          "Reading short texts",
          "Writing words and sentences",
          "Interactive conversation and retelling"
        ]
      },
      {
        "n": "English Language Development 3–5",
        "g": "Grades 3–5",
        "b": "3-5",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Moves from social English toward the language needed for ELA, Mathematics, Science, and Social Studies.",
        "s1": [
          "Receptive classroom language",
          "Vocabulary and word families",
          "Sentence patterns",
          "Narrating",
          "Describing",
          "Reading for main idea"
        ],
        "s2": [
          "Informing and explaining",
          "Comparing and contrasting",
          "Academic vocabulary",
          "Paragraph writing",
          "Asking and answering in discussion",
          "Short research and presentation"
        ]
      },
      {
        "n": "English Language Development 6–8",
        "g": "Grades 6–8",
        "b": "6-8",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Builds the academic English needed to understand subject-area texts, participate in discussions, and write connected texts.",
        "s1": [
          "Language for classroom interaction",
          "Complex sentences",
          "Vocabulary strategies",
          "Reading narrative and informational text",
          "Note-taking",
          "Narrating and summarizing"
        ],
        "s2": [
          "Explaining processes",
          "Supporting claims with evidence",
          "Comparing sources",
          "Structured paragraphs and essays",
          "Collaborative discussion",
          "Academic presentation"
        ]
      },
      {
        "n": "English Language Development 9–12",
        "g": "Grades 9–12",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Builds the language of high-school coursework: complex texts, argument, research, and formal communication.",
        "s1": [
          "Academic vocabulary and morphology",
          "Complex grammar",
          "Reading discipline-specific texts",
          "Lecture and media note-taking",
          "Summary and paraphrase",
          "Citing evidence"
        ],
        "s2": [
          "Explanation and argument",
          "Source synthesis",
          "Research conventions",
          "Seminar discussion",
          "Formal presentation",
          "Academic and career communication"
        ]
      },
      {
        "n": "Spanish I",
        "g": "Grades 6–12",
        "b": "6-8,9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "A first Spanish course centered on comprehensible input and communication from the beginning.",
        "s1": [
          "Greetings and introductions",
          "Pronunciation",
          "Numbers, dates and time",
          "Classroom language",
          "Nouns and articles",
          "Present-tense regular verbs",
          "Ser, estar and basic descriptions"
        ],
        "s2": [
          "Common irregular verbs",
          "Family and relationships",
          "Daily routines",
          "Food and ordering",
          "School and activities",
          "Questions and directions",
          "Spanish-speaking cultures",
          "Novice conversation project"
        ]
      },
      {
        "n": "Spanish II",
        "g": "Grades 7–12",
        "b": "6-8,9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Develops narration, practical communication, and cultural competence.",
        "s1": [
          "Preterite",
          "Imperfect",
          "Choosing past tenses",
          "Reflexive verbs",
          "Direct and indirect objects",
          "Travel and directions"
        ],
        "s2": [
          "Commands",
          "Comparisons",
          "Health and the body",
          "Shopping and services",
          "Weather and environment",
          "Festivals and traditions",
          "Extended narration project"
        ]
      },
      {
        "n": "Spanish III",
        "g": "Grades 9–12",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Moves students toward connected discourse, authentic texts, opinion, and discussion.",
        "s1": [
          "Present subjunctive",
          "Future and conditional",
          "Perfect tenses",
          "Por and para",
          "Relative pronouns",
          "Reading authentic short texts"
        ],
        "s2": [
          "Imperfect subjunctive",
          "Hypothetical language",
          "Formal and informal writing",
          "Debate and opinion",
          "Film, literature and current events",
          "Intermediate portfolio"
        ]
      },
      {
        "n": "French I",
        "g": "Grades 6–12",
        "b": "6-8,9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Introduces French with particular attention to pronunciation and listening.",
        "s1": [
          "Greetings and classroom language",
          "Pronunciation, accents and liaison",
          "Numbers, dates and time",
          "Articles and gender",
          "Regular present-tense verbs",
          "Être and avoir"
        ],
        "s2": [
          "Aller, faire and common verbs",
          "Adjective agreement",
          "Family and home",
          "Food and cafés",
          "Hobbies and school",
          "Questions and directions",
          "Francophone cultures",
          "Novice speaking project"
        ]
      },
      {
        "n": "French II",
        "g": "Grades 7–12",
        "b": "6-8,9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Develops past narration, pronouns, and practical communication in Francophone contexts.",
        "s1": [
          "Passé composé",
          "Imparfait",
          "Choosing past tenses",
          "Reflexive verbs",
          "Object pronouns",
          "Travel and transport"
        ],
        "s2": [
          "Future forms",
          "Comparisons",
          "Health and daily life",
          "Shopping and services",
          "Housing and city life",
          "Francophone art, cuisine and cinema",
          "Narrative portfolio"
        ]
      },
      {
        "n": "American Sign Language I",
        "g": "Grades 6–12",
        "b": "6-8,9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "An introductory visual-communication course in ASL and Deaf culture.",
        "s1": [
          "Visual communication norms",
          "Fingerspelling and numbers",
          "Introductions",
          "Pronouns and indexing",
          "Basic sentence structure",
          "Family and descriptions"
        ],
        "s2": [
          "Time and daily routine",
          "School and activities",
          "Food and preferences",
          "Questions and directions",
          "Classifiers and spatial use",
          "Deaf culture and community",
          "Novice signed conversation"
        ]
      },
      {
        "n": "American Sign Language II",
        "g": "Grades 7–12",
        "b": "6-8,9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Extends fluency, classifiers, spatial grammar, and storytelling.",
        "s1": [
          "Review and conversational repair",
          "Advanced fingerspelling",
          "Classifier predicates",
          "Spatial agreement",
          "Past and future time",
          "Describing places and movement"
        ],
        "s2": [
          "Narrating events",
          "Role shift",
          "Opinions and comparisons",
          "Community interactions",
          "Deaf history and identity",
          "Receptive comprehension",
          "Signed storytelling portfolio"
        ]
      },
      {
        "n": "German I",
        "g": "Grades 7–12",
        "b": "6-8,9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "A first-year German course that introduces the case system as a central part of meaning.",
        "s1": [
          "Pronunciation and greetings",
          "Numbers, dates and time",
          "Nouns, gender and articles",
          "Present-tense verbs",
          "Nominative case",
          "Family and descriptions"
        ],
        "s2": [
          "Accusative case",
          "Word order",
          "Modal verbs",
          "Separable-prefix verbs",
          "Home and routines",
          "Food and shopping",
          "German-speaking cultures",
          "Novice communication project"
        ]
      },
      {
        "n": "Mandarin Chinese I",
        "g": "Grades 7–12",
        "b": "6-8,9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Develops tones, pinyin, high-frequency characters, and everyday communication.",
        "s1": [
          "Pinyin and tones",
          "Greetings and introductions",
          "Numbers, dates and time",
          "Basic sentence patterns",
          "Questions and particles",
          "Character strokes and radicals"
        ],
        "s2": [
          "Measure words",
          "Family and occupations",
          "Food and ordering",
          "Shopping and money",
          "Places and directions",
          "Daily routine",
          "Festivals and everyday culture",
          "Novice conversation portfolio"
        ]
      },
      {
        "n": "Latin I",
        "g": "Grades 8–12",
        "b": "6-8,9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "A reading-focused introduction to Latin grammar, Roman culture, and Latin roots in English.",
        "s1": [
          "Pronunciation",
          "First and second declensions",
          "Present-tense conjugations",
          "Cases and sentence roles",
          "Adjectives and agreement",
          "Adapted reading"
        ],
        "s2": [
          "Third declension",
          "Imperfect and perfect tenses",
          "Prepositions and ablative uses",
          "Pronouns",
          "Translation strategies",
          "Latin roots in English",
          "Roman daily life and mythology",
          "Final reading project"
        ]
      }
    ],
    "note": "English language arts, English language development, and world languages — from early literacy through high-school composition and novice-to-intermediate language courses."
  },
  {
    "subject": "Science",
    "color": "linear-gradient(160deg, #7fe3a1, #3cba6f)",
    "courses": [
      {
        "n": "Science Explorations",
        "g": "Grades K–2",
        "b": "K-2",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Uses observation, simple investigations, and models to explore living things, matter, Earth, and space through Kindergarten, Grade 1, and Grade 2 pathways.",
        "s1": [
          "Asking questions like a scientist",
          "Living and nonliving things",
          "What plants and animals need",
          "Habitats",
          "Weather and seasons",
          "Materials and their properties"
        ],
        "s2": [
          "Pushes, pulls and motion",
          "Light and sound",
          "Sun, Moon and sky patterns",
          "Land and water",
          "How living things change environments",
          "Solving simple engineering problems"
        ]
      },
      {
        "n": "Science Discovery",
        "g": "Grades 3–5",
        "b": "3-5",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "An integrated elementary course in life, physical, Earth, and space science with grade-specific pathways.",
        "s1": [
          "Scientific investigation and models",
          "Plant and animal life cycles",
          "Traits and variation",
          "Ecosystems and food webs",
          "Matter and measurement",
          "Physical and chemical changes"
        ],
        "s2": [
          "Forces and motion",
          "Energy transfer",
          "Light and sound",
          "Earth's systems and materials",
          "Weather and climate",
          "Solar system",
          "Natural resources",
          "Engineering design challenge"
        ]
      },
      {
        "n": "Middle School Life Science",
        "g": "Grades 6–8",
        "b": "6-8",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Moves from cells and body systems to heredity, evolution, and ecosystem dynamics.",
        "s1": [
          "Cells and cell processes",
          "Levels of organization",
          "Body systems",
          "Growth and reproduction",
          "Photosynthesis and respiration",
          "Genes, chromosomes and inheritance"
        ],
        "s2": [
          "Variation and mutation",
          "Natural selection and evolution",
          "Food webs and energy flow",
          "Cycles of matter",
          "Populations and carrying capacity",
          "Biodiversity",
          "Human impact",
          "Investigation project"
        ]
      },
      {
        "n": "Middle School Earth & Space Science",
        "g": "Grades 6–8",
        "b": "6-8",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Covers Earth's place in space, geologic change, weather, climate, resources, and natural hazards.",
        "s1": [
          "Scale of the universe",
          "Solar system",
          "Sun–Earth–Moon system",
          "Seasons, tides and eclipses",
          "Earth's interior",
          "Plate tectonics",
          "Rocks and geologic time"
        ],
        "s2": [
          "Weathering, erosion and landforms",
          "Water cycle",
          "Atmosphere and weather",
          "Climate systems and change",
          "Natural resources",
          "Natural hazards",
          "Evidence-based Earth systems project"
        ]
      },
      {
        "n": "Middle School Physical Science",
        "g": "Grades 6–8",
        "b": "6-8",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Combines an appropriate middle-school scope of chemistry and physics instead of splitting them into two artificially narrow courses.",
        "s1": [
          "Particle model of matter",
          "Atoms, elements and the periodic table",
          "Physical and chemical properties",
          "Chemical reactions",
          "Conservation of mass",
          "Mixtures and solutions",
          "Thermal energy"
        ],
        "s2": [
          "Motion and forces",
          "Newtonian reasoning",
          "Gravity, electricity and magnetism",
          "Work and energy",
          "Waves",
          "Sound and light",
          "Simple circuits",
          "Engineering design challenge"
        ]
      },
      {
        "n": "High School Biology: Cells, Genetics, Evolution & Ecology",
        "g": "Recommended grades 9–10",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "A complete introductory high-school biology course covering molecular genetics, evolution, ecology, and scientific inquiry. It does not claim to cover the entire discipline of biology.",
        "s1": [
          "Nature of science and experimental design",
          "Biochemistry and macromolecules",
          "Cell structure and transport",
          "Photosynthesis and respiration",
          "Cell cycle and differentiation",
          "DNA, RNA and protein synthesis",
          "Gene regulation"
        ],
        "s2": [
          "Mendelian and non-Mendelian inheritance",
          "Biotechnology and bioethics",
          "Evolution and natural selection",
          "Speciation and phylogeny",
          "Diversity of life",
          "Ecology",
          "Population dynamics",
          "Human impact and capstone investigation"
        ]
      },
      {
        "n": "High School Chemistry: Matter, Reactions & Energy",
        "g": "Recommended grades 10–11",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Covers atomic structure, bonding, reactions, and quantitative chemistry through virtual or household-safe investigations.",
        "s1": [
          "Measurement and matter",
          "Atomic structure and isotopes",
          "Electron configuration",
          "Periodic trends",
          "Ionic and covalent bonding",
          "Molecular geometry and intermolecular forces",
          "Chemical equations"
        ],
        "s2": [
          "Mole and stoichiometry",
          "Gas behavior",
          "Solutions and concentration",
          "Thermochemistry",
          "Reaction rates",
          "Equilibrium",
          "Acids, bases and pH",
          "Redox and electrochemistry",
          "Nuclear chemistry"
        ]
      },
      {
        "n": "Algebra-Based Physics: Mechanics, Waves & Electricity",
        "g": "Recommended grades 10–12",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "A complete introductory high-school physics course covering mechanics, waves, electricity, magnetism, and selected modern-physics concepts. It does not claim to cover the entire discipline of physics.",
        "s1": [
          "Measurement and vectors",
          "One-dimensional motion",
          "Two-dimensional motion",
          "Forces and free-body diagrams",
          "Circular motion and gravitation",
          "Work, energy and power",
          "Momentum and collisions"
        ],
        "s2": [
          "Rotational motion",
          "Simple harmonic motion",
          "Waves and sound",
          "Light and optics",
          "Electrostatics",
          "Electric circuits",
          "Magnetism and induction",
          "Modern and nuclear physics"
        ]
      },
      {
        "n": "Environmental Science",
        "g": "Grades 9–12",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Connects natural systems, human activity, evidence, policy, and possible solutions.",
        "e": true,
        "s1": [
          "Earth systems",
          "Ecosystems and biodiversity",
          "Population ecology",
          "Water resources",
          "Soil and agriculture",
          "Forests and land use",
          "Energy resources"
        ],
        "s2": [
          "Pollution and waste",
          "Atmosphere and air quality",
          "Climate science",
          "Conservation",
          "Environmental health",
          "Economics and policy",
          "Sustainability solutions",
          "Local environmental investigation"
        ]
      },
      {
        "n": "Anatomy & Physiology",
        "g": "Grades 10–12",
        "b": "9-12",
        "p": "Semester $129",
        "fmt": "Semester",
        "d": "Studies human body structure, system interactions, and the maintenance of homeostasis.",
        "u": [
          "Anatomical language and homeostasis",
          "Cells and tissues",
          "Skeletal and muscular systems",
          "Nervous and endocrine systems",
          "Cardiovascular and respiratory systems",
          "Digestive and urinary systems",
          "Immune and reproductive systems",
          "Health case study"
        ]
      },
      {
        "n": "Astronomy",
        "g": "Grades 9–12",
        "b": "9-12",
        "p": "Specialty $149",
        "fmt": "Specialty",
        "d": "A modern astronomy course extending from sky observation to stars, galaxies, and cosmology.",
        "e": true,
        "u": [
          "Observing the sky",
          "Light and telescopes",
          "Solar system formation",
          "Planets and small bodies",
          "The Sun",
          "Stars and stellar evolution",
          "Galaxies",
          "Expansion and cosmology",
          "Astrobiology and space exploration"
        ]
      }
    ]
  },
  {
    "subject": "Social Studies",
    "color": "linear-gradient(160deg, #f6b26b, #e8833a)",
    "courses": [
      {
        "n": "People, Communities & Our World",
        "g": "Grades K–2",
        "b": "K-2",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Introduces citizenship, family, community, rules, maps, the past, and the wider world through Kindergarten, Grade 1, and Grade 2 pathways.",
        "s1": [
          "Self, family and identity",
          "Rules, fairness and responsibility",
          "Classroom and community",
          "Community helpers and institutions",
          "Needs, wants and choices",
          "Past, present and change"
        ],
        "s2": [
          "Maps and globes",
          "Land, water and place",
          "Cultures and traditions",
          "Leaders and symbols",
          "How communities solve problems",
          "The wider world",
          "Young citizen project"
        ]
      },
      {
        "n": "Regions, Government & Early U.S. History",
        "g": "Grades 3–5",
        "b": "3-5",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "A banded course with distinct pathways: Grade 3 local and state studies, Grade 4 regions and cultures, and Grade 5 early U.S. studies.",
        "s1": [
          "Inquiry and primary sources",
          "Maps and geographic tools",
          "Indigenous peoples and place",
          "State and regional history",
          "Regions and cultures of the Americas",
          "Exploration and exchange",
          "Colonization and its consequences"
        ],
        "s2": [
          "Colonial societies",
          "Revolution and founding ideas",
          "Constitution and branches of government",
          "Rights and responsibilities",
          "Expansion and migration",
          "Civil War and Reconstruction overview",
          "Economics and resources",
          "State-specific inquiry project"
        ]
      },
      {
        "n": "World Geography & Cultures",
        "g": "Grades 6–8",
        "b": "6-8",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Uses physical and human geography to understand world regions and contemporary connections.",
        "s1": [
          "Geographic thinking and maps",
          "Physical systems",
          "Population and migration",
          "Culture and identity",
          "Economic systems and development",
          "North America",
          "Latin America"
        ],
        "s2": [
          "Europe",
          "Africa",
          "Southwest and Central Asia",
          "South and East Asia",
          "Southeast Asia and Oceania",
          "Globalization",
          "Human–environment interaction",
          "Regional inquiry project"
        ]
      },
      {
        "n": "Ancient & World Civilizations",
        "g": "Grades 6–8",
        "b": "6-8",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Examines the development of societies, belief systems, trade, government, and culture from the first civilizations to the early modern world.",
        "s1": [
          "Historical evidence and chronology",
          "First humans and agriculture",
          "Mesopotamia",
          "Ancient Egypt and Kush",
          "Ancient India",
          "Ancient China",
          "Hebrews and early belief systems"
        ],
        "s2": [
          "Greece",
          "Rome",
          "Byzantine and Islamic worlds",
          "African kingdoms",
          "Civilizations of the Americas",
          "Medieval Europe",
          "Renaissance and global exchange",
          "Comparative civilizations project"
        ]
      },
      {
        "n": "U.S. History Foundations",
        "g": "Grades 6–8",
        "b": "6-8",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Introduces U.S. history with emphasis on causation, primary sources, citizenship, and competing perspectives.",
        "s1": [
          "Indigenous North America",
          "Exploration and colonization",
          "Colonial regions",
          "Revolution",
          "Constitution and new republic",
          "Expansion and reform",
          "Slavery and sectional conflict"
        ],
        "s2": [
          "Civil War",
          "Reconstruction",
          "Industrialization and immigration",
          "Progressive Era",
          "World wars and Depression",
          "Civil Rights era",
          "Cold War",
          "Contemporary United States",
          "Civic inquiry project"
        ]
      },
      {
        "n": "Civics & Government",
        "g": "Grades 6–8",
        "b": "6-8",
        "p": "Semester $129",
        "fmt": "Semester",
        "d": "A practical course in government, rights, media literacy, and civic participation.",
        "e": true,
        "u": [
          "Purposes and forms of government",
          "Constitutional principles",
          "Three branches",
          "Federal, state and local government",
          "Rights and responsibilities",
          "Elections and public opinion",
          "Media and source evaluation",
          "Public policy",
          "Community action project"
        ]
      },
      {
        "n": "World History",
        "g": "Grades 9–12",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "Studies global history through change, continuity, exchange, conflict, ideas, and institutions.",
        "s1": [
          "Historical inquiry",
          "Early complex societies",
          "Classical states and belief systems",
          "Postclassical networks",
          "Islamic worlds",
          "African and American civilizations",
          "Renaissance and Reformation",
          "Maritime exchange"
        ],
        "s2": [
          "Revolutions and Enlightenment",
          "Industrialization and imperialism",
          "World War I",
          "Interwar period and totalitarianism",
          "World War II and genocide",
          "Cold War and decolonization",
          "Globalization",
          "Contemporary global challenges"
        ]
      },
      {
        "n": "U.S. History",
        "g": "Grades 9–12",
        "b": "9-12",
        "p": "Full year $199 · Semester $129",
        "fmt": "Full year or semester",
        "d": "A complete survey from pre-contact societies to the contemporary United States with primary-source analysis.",
        "s1": [
          "Indigenous societies and encounters",
          "Colonization",
          "Revolution",
          "Constitution and early republic",
          "Expansion and reform",
          "Slavery and sectionalism",
          "Civil War",
          "Reconstruction"
        ],
        "s2": [
          "Industrialization and immigration",
          "Progressive Era",
          "U.S. expansion",
          "World War I",
          "Great Depression and New Deal",
          "World War II",
          "Cold War",
          "Civil Rights movements",
          "Late twentieth century",
          "United States since 2000"
        ]
      },
      {
        "n": "U.S. Government & Civics",
        "g": "Grades 9–12",
        "b": "9-12",
        "p": "Semester $129",
        "fmt": "Semester",
        "d": "Covers constitutional government, civil liberties, elections, institutions, and public policy.",
        "u": [
          "Foundations of American government",
          "Constitution and federalism",
          "Congress",
          "Presidency and bureaucracy",
          "Courts and civil liberties",
          "Civil rights",
          "Parties, elections and voting",
          "Media and public opinion",
          "State and local government",
          "Policy analysis and civic participation"
        ]
      },
      {
        "n": "Economics",
        "g": "Grades 9–12",
        "b": "9-12",
        "p": "Semester $129",
        "fmt": "Semester",
        "d": "Introduces microeconomics, macroeconomics, and international economics through real decisions.",
        "e": true,
        "u": [
          "Scarcity and choice",
          "Incentives and opportunity cost",
          "Supply, demand and prices",
          "Firms, competition and market structures",
          "Labor and income",
          "Market failures and government",
          "GDP, growth and productivity",
          "Inflation and unemployment",
          "Money and monetary policy",
          "Fiscal policy",
          "Trade and globalization"
        ]
      },
      {
        "n": "Psychology",
        "g": "Grades 10–12",
        "b": "9-12",
        "p": "Semester $129",
        "fmt": "Semester",
        "d": "A scientific introduction to behavior and mental processes that explicitly avoids self-diagnosis.",
        "e": true,
        "u": [
          "Foundations, research and ethics",
          "Biological bases of behavior",
          "Sensation and perception",
          "Consciousness and sleep",
          "Learning",
          "Memory and cognition",
          "Human development",
          "Motivation and emotion",
          "Personality",
          "Psychological disorders and treatment",
          "Social psychology"
        ]
      },
      {
        "n": "Art History & Visual Culture",
        "g": "Grades 9–12",
        "b": "9-12",
        "p": "Specialty $149",
        "fmt": "Specialty",
        "d": "An analytical course—not a studio-art course—about how images, architecture, and objects express power, belief, identity, and social change.",
        "e": true,
        "u": [
          "How to look at art",
          "Methods and visual analysis",
          "Ancient worlds",
          "Sacred art and architecture",
          "Asia, Africa and the Islamic world",
          "Renaissance and early modern Europe",
          "Art of the Americas",
          "Revolution, industry and modernity",
          "Modernisms",
          "Contemporary art, museums and cultural heritage"
        ]
      },
      {
        "n": "Philosophy, Ethics & Ideas",
        "g": "Grades 9–12",
        "b": "9-12",
        "p": "Specialty $149",
        "fmt": "Specialty",
        "d": "Introduces philosophical inquiry and applies ethical reasoning to personal, social, and technological dilemmas.",
        "e": true,
        "u": [
          "What is a philosophical question?",
          "Arguments, logic and fallacies",
          "Knowledge, evidence and truth",
          "Self, mind and free will",
          "Major ethical frameworks",
          "Rights, justice and social contract",
          "Applied ethics",
          "Technology and AI ethics",
          "Structured dialogue and final position paper"
        ]
      }
    ]
  },
  {
    "subject": "AI & Digital Literacy",
    "color": "linear-gradient(160deg, #5ec8d6, #2a8ea3)",
    "courses": [
      {
        "n": "Digital World & Online Safety",
        "g": "Grades 3–5",
        "b": "3-5",
        "p": "Semester $129",
        "fmt": "Semester",
        "d": "Builds foundational literacy for students who learn, communicate, and create in digital environments.",
        "u": [
          "Devices, software and files",
          "Accounts and strong passwords",
          "Privacy and personal information",
          "Search and source basics",
          "Digital communication and kindness",
          "Scams, ads and manipulation",
          "Copyright and giving credit",
          "Healthy technology habits",
          "Digital citizenship project"
        ]
      },
      {
        "n": "AI Explorations",
        "g": "Grades 3–5",
        "b": "3-5",
        "p": "Specialty $149",
        "fmt": "Specialty",
        "d": "An age-appropriate introduction to AI through everyday examples, classification, patterns, and responsible choices, without unsupervised access to unsuitable tools.",
        "e": true,
        "u": [
          "Where we meet AI",
          "Humans, rules and learned patterns",
          "Data teaches systems",
          "Classification and prediction",
          "Why AI makes mistakes",
          "Fairness and privacy",
          "Asking AI safely with an adult",
          "Explain-an-AI project"
        ]
      },
      {
        "n": "AI Literacy & Responsible Use",
        "g": "Grades 6–8",
        "b": "6-8",
        "p": "Specialty $149",
        "fmt": "Specialty",
        "d": "Teaches students to understand AI limitations, verify outputs, and preserve human agency—not merely to enter prompts.",
        "e": true,
        "u": [
          "What counts as AI",
          "Data, patterns and models",
          "Generative AI and language models",
          "Prompt, context and iteration",
          "Hallucinations and verification",
          "Bias and representation",
          "Privacy, safety and digital footprint",
          "Copyright and attribution",
          "Human accountability",
          "Responsible-use portfolio"
        ]
      },
      {
        "n": "Applied AI for Learning & Creation",
        "g": "Grades 8–12",
        "b": "6-8,9-12",
        "p": "Specialty $169",
        "fmt": "Specialty",
        "d": "A practical course in building verifiable AI-assisted workflows for research, learning, writing, and problem-solving.",
        "e": true,
        "u": [
          "Choosing the right problem",
          "Designing effective instructions",
          "Research with source verification",
          "Reading and knowledge synthesis",
          "Writing without losing authorship",
          "Data and document analysis",
          "Multimodal creation",
          "Feedback and iteration",
          "Automation without code",
          "Capstone workflow with audit trail"
        ]
      },
      {
        "n": "Data, Models & How AI Works",
        "g": "Grades 9–12",
        "b": "9-12",
        "p": "Specialty $169",
        "fmt": "Specialty",
        "d": "Conceptual technical literacy explaining what happens between data, training, a model, and its output, without requiring Python.",
        "e": true,
        "u": [
          "Data representation",
          "Labels, features and patterns",
          "Training, validation and testing",
          "Classification and prediction",
          "Neural-network intuition",
          "Language models and tokens",
          "Embeddings and similarity",
          "Generative models",
          "Evaluation and benchmarks",
          "Failure modes, security and model limitations",
          "No-code model investigation"
        ]
      },
      {
        "n": "AI Ethics, Society & Future of Work",
        "g": "Grades 9–12",
        "b": "9-12",
        "p": "Specialty $149",
        "fmt": "Specialty",
        "d": "Examines the effects of AI on rights, institutions, labor, media, education, and personal decision-making.",
        "e": true,
        "u": [
          "Human agency and accountability",
          "Privacy and surveillance",
          "Bias, fairness and inclusion",
          "Misinformation and synthetic media",
          "Copyright and creative ownership",
          "AI in education and assessment",
          "Jobs, automation and new roles",
          "Environmental and social costs",
          "Governance and regulation",
          "Policy debate and future-of-work plan"
        ]
      }
    ]
  },
  {
    "subject": "Life & Career Skills",
    "color": "linear-gradient(160deg, #f08ab0, #d45a86)",
    "courses": [
      {
        "n": "Personal Finance",
        "g": "Grades 8–12",
        "b": "6-8,9-12",
        "p": "Semester $129",
        "fmt": "Semester",
        "d": "A complete decision-making course that is broader than Financial Mathematics because it includes behavior, products, risks, and consumer choices.",
        "u": [
          "Earning income",
          "Taxes and paychecks",
          "Spending plans",
          "Saving and emergency funds",
          "Banking",
          "Credit and debt",
          "Education and borrowing",
          "Insurance",
          "Investing and retirement",
          "Fraud and consumer protection",
          "Personal financial plan"
        ]
      },
      {
        "n": "Study Skills & Executive Function",
        "g": "Grades 6–12",
        "b": "6-8,9-12",
        "p": "Specialty $149",
        "fmt": "Specialty",
        "d": "The course is built around the student's real academic tasks; its shorter duration does not imply lower value.",
        "e": true,
        "u": [
          "Learning profile and baseline",
          "Goals and realistic planning",
          "Time estimation and weekly scheduling",
          "Starting tasks and overcoming avoidance",
          "Attention and distraction management",
          "Notes and active reading",
          "Memory and retrieval practice",
          "Breaking down long projects",
          "Assessment preparation",
          "Personal learning system"
        ]
      },
      {
        "n": "Public Speaking & Communication",
        "g": "Grades 6–12",
        "b": "6-8,9-12",
        "p": "Semester $129",
        "fmt": "Semester",
        "d": "Develops oral communication through recorded submissions, reflection, and revision.",
        "u": [
          "Audience and purpose",
          "Organizing a talk",
          "Voice, pacing and body language",
          "Storytelling",
          "Informative speaking",
          "Persuasive speaking",
          "Evidence and visual support",
          "Active listening",
          "Discussion and interviewing",
          "Debate",
          "Final recorded presentation"
        ]
      },
      {
        "n": "Career Exploration",
        "g": "Grades 8–12",
        "b": "6-8,9-12",
        "p": "Specialty $149",
        "fmt": "Specialty",
        "d": "An investigation of career clusters, skills, education routes, and real trade-offs—not a simplistic career-matching quiz.",
        "e": true,
        "u": [
          "Interests, values and strengths",
          "Jobs, occupations and career paths",
          "Career clusters",
          "Researching labor-market information",
          "Skills and employability",
          "Education, training and credentials",
          "Comparing cost and opportunity",
          "Informational interview",
          "Personal pathway map"
        ]
      },
      {
        "n": "Entrepreneurship",
        "g": "Grades 9–12",
        "b": "9-12",
        "p": "Specialty $149",
        "fmt": "Specialty",
        "d": "Moves from problem discovery to a testable small-venture concept with a budget and pitch.",
        "e": true,
        "u": [
          "Entrepreneurial mindset and ethics",
          "Finding real problems",
          "Customer discovery",
          "Value proposition",
          "Market and competitor research",
          "Business models",
          "Costs, pricing and simple finance",
          "Marketing and sales",
          "Operations and risk",
          "Prototype or minimum viable offer",
          "Pitch and reflection"
        ]
      },
      {
        "n": "Health & Wellness",
        "g": "Grades 6–12",
        "b": "6-8,9-12",
        "p": "Semester $129",
        "fmt": "Semester",
        "d": "Builds evidence-based health decisions, protective behaviors, and navigation of reliable information. Sensitive topics are adapted by age and parental settings.",
        "u": [
          "Dimensions of health",
          "Finding reliable health information",
          "Nutrition and food decisions",
          "Physical activity and sleep",
          "Mental and emotional wellbeing",
          "Stress and coping",
          "Relationships, communication and boundaries",
          "Substance-use prevention",
          "Safety and first-response basics",
          "Health services and advocacy",
          "Personal wellness plan"
        ]
      }
    ]
  }
];

(function () {
  var mount = document.getElementById('catalog');
  var empty = document.getElementById('empty');
  var count = document.getElementById('count');
  var search = document.getElementById('search');
  if (!mount) return;

  var state = { subject: 'all', band: 'all', q: '' };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function unitItems(c) {
    if (c.s1 && c.s2) return c.s1.concat(c.s2);
    return c.u || [];
  }

  function unitList(items) {
    return '<ol class="units">' + items.map(function (u) { return '<li>' + esc(u) + '</li>'; }).join('') + '</ol>';
  }

  function unitsBlock(c) {
    if (c.s1 && c.s2) {
      return '<p class="units-label">Semester 1</p>' + unitList(c.s1) +
        '<p class="units-label units-label-next">Semester 2</p>' + unitList(c.s2);
    }
    return '<p class="units-label">Units</p>' + unitList(c.u || []);
  }

  var totalCourses = 0, totalUnits = 0;

  var html = '';
  CATALOG.forEach(function (group) {
    var courses = '';
    group.courses.forEach(function (c) {
      var items = unitItems(c);
      totalCourses++;
      totalUnits += items.length;
      var haystack = (c.n + ' ' + c.g + ' ' + c.d + ' ' + (c.p || '') + ' ' + (c.fmt || '') + ' ' + items.join(' ')).toLowerCase();
      courses +=
        '<details class="course-item" data-subject="' + esc(group.subject) + '" data-band="' + esc(c.b) + '" data-elective="' + (c.e ? '1' : '0') + '" data-text="' + esc(haystack) + '">' +
          '<summary>' +
            '<span class="course-name">' + esc(c.n) + '</span>' +
            '<span class="course-meta">' +
              '<span class="meta-pill">' + esc(c.g) + '</span>' +
              (c.p ? '<span class="meta-pill is-price">' + esc(c.p) + '</span>' : '') +
              '<span class="meta-pill">' + items.length + ' units</span>' +
              (c.e ? '<span class="meta-pill is-elective">Elective</span>' : '') +
            '</span>' +
            '<span class="course-toggle" aria-hidden="true">+</span>' +
          '</summary>' +
          '<div class="course-body">' +
            '<p class="course-blurb">' + esc(c.d) + '</p>' +
            unitsBlock(c) +
            '<p class="course-turnaround">Choose this course and we deliver the personalized version in <b>72 hours</b>.</p>' +
            '<div class="course-actions">' +
              '<a class="a-dark js-lead" href="#" data-intent="enroll" data-course="' + esc(c.n) + '">Choose this course →</a>' +
              '<a class="a-light js-lead" href="#" data-intent="syllabus" data-course="' + esc(c.n) + '">Download syllabus</a>' +
              '<a class="a-light" href="#states">Check ESA status</a>' +
            '</div>' +
          '</div>' +
        '</details>';
    });

    html +=
      '<section class="subject-block" data-subject="' + esc(group.subject) + '">' +
        '<div class="subject-head">' +
          '<span class="subject-swatch" style="background:' + group.color + '" aria-hidden="true"></span>' +
          '<h2>' + esc(group.subject) + '</h2>' +
          '<span class="subject-count">' + group.courses.length + ' courses</span>' +
        '</div>' +
        (group.note ? '<p class="course-blurb" style="margin-top:18px;border:none;padding:0;">' + esc(group.note) + '</p>' : '') +
        '<div class="course-list">' + courses + '</div>' +
      '</section>';
  });

  mount.innerHTML = html;

  var items = mount.querySelectorAll('.course-item');
  var blocks = mount.querySelectorAll('.subject-block');

  function bandOk(item) {
    if (state.band === 'all') return true;
    if (state.band === 'Elective') return item.dataset.elective === '1';
    var bands = (item.dataset.band || '').split(',');
    return bands.indexOf(state.band) !== -1;
  }

  function apply() {
    var shown = 0;
    var q = state.q.trim().toLowerCase();

    items.forEach(function (item) {
      var ok =
        (state.subject === 'all' || item.dataset.subject === state.subject) &&
        bandOk(item) &&
        (!q || item.dataset.text.indexOf(q) !== -1);
      item.hidden = !ok;
      if (ok) shown++;

      if (!ok) {
        item.open = false;
        delete item.dataset.auto;
      } else if (q.length > 2) {
        item.open = true;
        item.dataset.auto = '1';
      } else if (item.dataset.auto) {
        item.open = false;
        delete item.dataset.auto;
      }
    });

    blocks.forEach(function (block) {
      var visible = block.querySelectorAll('.course-item:not([hidden])').length;
      block.hidden = visible === 0;
      block.querySelector('.subject-count').textContent =
        visible + (visible === 1 ? ' course' : ' courses');
    });

    empty.classList.toggle('is-visible', shown === 0);
    count.innerHTML = '<b>' + shown + '</b> of ' + totalCourses + ' courses · ' + totalUnits + ' units in the catalog';
  }

  document.querySelectorAll('.filter[data-kind]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var kind = btn.dataset.kind;
      document.querySelectorAll('.filter[data-kind="' + kind + '"]').forEach(function (b) {
        b.classList.remove('is-active');
      });
      btn.classList.add('is-active');
      state[kind] = btn.dataset.value;
      apply();
    });
  });

  search.addEventListener('input', function () {
    state.q = search.value;
    apply();
  });

  apply();

  var COPY = {
    enroll: {
      title: 'Get this course',
      body: 'Enter your email and we’ll send onboarding instructions and the materials to get started with {course}.',
      submit: 'Send instructions'
    },
    syllabus: {
      title: 'Get the syllabus',
      body: 'Enter your email and we’ll send the syllabus and course materials for {course}.',
      submit: 'Send syllabus'
    }
  };

  var modal = document.getElementById('lead-modal');
  if (!modal) return;

  var form = document.getElementById('lead-form');
  var emailInput = document.getElementById('lead-email');
  var errorEl = document.getElementById('lead-error');
  var submitBtn = document.getElementById('lead-submit');
  var formStep = modal.querySelector('[data-step="form"]');
  var doneStep = modal.querySelector('[data-step="done"]');
  var lastTrigger = null;
  var sending = false;

  function setCopy(intent, course) {
    var pack = COPY[intent] || COPY.enroll;
    document.getElementById('lead-title').textContent = pack.title;
    document.getElementById('lead-copy').textContent = pack.body.replace('{course}', course || 'this course');
    submitBtn.textContent = pack.submit;
    document.getElementById('lead-done').textContent =
      'We sent the instructions and materials to ' + (emailInput.value.trim() || 'your email') +
      '. If you don’t see them in a minute, check spam.';
  }

  function openLead(intent, course, trigger) {
    lastTrigger = trigger || null;
    sending = false;
    form.reset();
    errorEl.hidden = true;
    emailInput.removeAttribute('aria-invalid');
    submitBtn.disabled = false;
    submitBtn.textContent = (COPY[intent] || COPY.enroll).submit;
    formStep.hidden = false;
    doneStep.hidden = true;
    setCopy(intent, course);
    modal.hidden = false;
    document.body.classList.add('is-locked');
    window.setTimeout(function () { emailInput.focus(); }, 30);
  }

  function closeLead() {
    modal.hidden = true;
    document.body.classList.remove('is-locked');
    sending = false;
    if (lastTrigger) lastTrigger.focus();
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  document.addEventListener('click', function (e) {
    var lead = e.target.closest('.js-lead');
    if (lead) {
      e.preventDefault();
      openLead(lead.dataset.intent, lead.dataset.course, lead);
      return;
    }
    if (!modal.hidden && e.target.closest('#lead-modal [data-close]')) {
      e.preventDefault();
      closeLead();
    }
  });

  modal.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLead();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    var value = emailInput.value.trim();
    if (!validEmail(value)) {
      errorEl.hidden = false;
      emailInput.setAttribute('aria-invalid', 'true');
      emailInput.focus();
      return;
    }
    errorEl.hidden = true;
    emailInput.removeAttribute('aria-invalid');
    sending = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    window.setTimeout(function () {
      document.getElementById('lead-done').textContent =
        'We sent the instructions and materials to ' + value +
        '. If you don’t see them in a minute, check spam.';
      formStep.hidden = true;
      doneStep.hidden = false;
      sending = false;
      var doneBtn = doneStep.querySelector('[data-close]');
      if (doneBtn) doneBtn.focus();
    }, 700);
  });
})();
