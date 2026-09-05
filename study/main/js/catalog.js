/* Brights.ai course catalog — data + rendering, search and filters. */

var CATALOG = [
  {
    subject: 'Math',
    color: 'linear-gradient(160deg, #8ecdf2, #4b93d1)',
    courses: [
      {
        n: 'Early Math Foundations', g: 'Pre-K – K', b: 'K-2', h: '40–60 hrs',
        d: 'A first course in numbers, shapes, and quantity for children who are not yet reading independently. Lessons are short, spoken, and built around objects the child can count.',
        u: ['Counting to 20', 'Comparing more and fewer', 'Recognising written numerals', 'Shapes around us', 'Simple repeating patterns', 'Adding within 10', 'Taking away within 10', 'Measuring with everyday objects', 'Sorting and grouping']
      },
      {
        n: 'Kindergarten Math', g: 'Grade K', b: 'K-2', h: '60–80 hrs',
        d: 'Number sense to 100, the first ideas of place value, and the language of measurement and shape.',
        u: ['Numbers to 100', 'Counting by twos, fives, and tens', 'First steps in place value', 'Addition stories', 'Subtraction stories', 'Making ten', 'Flat and solid shapes', 'Length, weight, and capacity', 'Sorting data into categories']
      },
      {
        n: 'Grade 1 Math', g: 'Grade 1', b: 'K-2', h: '90–110 hrs',
        d: 'Fluency within 20, tens and ones, and the first two-step word problems.',
        u: ['Tens and ones', 'Addition within 20', 'Subtraction within 20', 'Fact families', 'Two-step word problems', 'Comparing numbers to 120', 'Telling time to the half hour', 'Picture graphs and tally charts', 'Shapes, halves, and quarters']
      },
      {
        n: 'Grade 2 Math', g: 'Grade 2', b: 'K-2', h: '100–120 hrs',
        d: 'Place value to 1,000, multi-digit addition and subtraction, money, time, and the first look at fractions of a shape.',
        u: ['Place value to 1,000', 'Addition within 100', 'Subtraction within 100', 'Adding and subtracting to 1,000', 'Mental strategies and estimation', 'Money and making change', 'Time to five minutes', 'Length in inches and centimetres', 'Bar graphs and line plots', 'Equal shares and fractions of a shape', 'Arrays and repeated addition']
      },
      {
        n: 'Grade 3 Math', g: 'Grade 3', b: '3-5', h: '120–140 hrs',
        d: 'Multiplication and division become the centre of the year, alongside fractions on a number line and the first work with area and perimeter.',
        u: ['Multiplication foundations', 'Division foundations', 'Multiplication and division facts', 'Multi-step word problems', 'Rounding and estimation', 'Fractions on a number line', 'Equivalent fractions', 'Comparing fractions', 'Area of rectangles', 'Perimeter', 'Quadrilaterals and their properties', 'Time intervals', 'Mass and liquid volume', 'Scaled picture and bar graphs']
      },
      {
        n: 'Grade 4 Math', g: 'Grade 4', b: '3-5', h: '130–150 hrs',
        d: 'Multi-digit arithmetic, fraction operations, decimal notation, and a full unit on angles and geometric figures.',
        u: ['Multi-digit place value', 'Addition and subtraction to a million', 'Multiplying by one-digit numbers', 'Multiplying by two-digit numbers', 'Long division with remainders', 'Factors, multiples, and primes', 'Comparing and ordering fractions', 'Adding and subtracting fractions', 'Multiplying fractions by whole numbers', 'Decimal notation to hundredths', 'Angles and angle measure', 'Lines, rays, and symmetry', 'Area and perimeter problems', 'Converting units of measurement', 'Line plots with fractional units']
      },
      {
        n: 'Grade 5 Math', g: 'Grade 5', b: '3-5', h: '130–150 hrs',
        d: 'Decimal operations, fraction multiplication and division, volume, and the coordinate plane.',
        u: ['Decimal place value', 'Adding and subtracting decimals', 'Multiplying decimals', 'Dividing decimals', 'Powers of ten', 'Fractions with unlike denominators', 'Multiplying fractions', 'Dividing with unit fractions', 'Multi-digit multiplication and division', 'Volume of rectangular solids', 'The coordinate plane', 'Numerical expressions and order of operations', 'Converting measurement units', 'Classifying two-dimensional shapes', 'Interpreting line plots']
      },
      {
        n: 'Grade 6 Math', g: 'Grade 6', b: '6-8', h: '140–160 hrs',
        d: 'Ratio reasoning, negative numbers, and the transition from arithmetic to algebraic thinking.',
        u: ['Ratios and ratio reasoning', 'Unit rates', 'Percentages', 'Dividing fractions', 'Decimal operations fluency', 'Exponents and order of operations', 'Negative numbers', 'Absolute value and the number line', 'Variables and expressions', 'One-step equations', 'Inequalities', 'Area, surface area, and volume', 'The coordinate plane and polygons', 'Statistical questions and distributions', 'Measures of centre and variability']
      },
      {
        n: 'Grade 7 Math', g: 'Grade 7', b: '6-8', h: '140–160 hrs',
        d: 'Proportional relationships and rational number operations, plus circles, angle relationships, and probability.',
        u: ['Proportional relationships', 'Constant of proportionality', 'Scale drawings', 'Percent increase and decrease', 'Operations with rational numbers', 'Expressions and linear equations', 'Inequalities and their graphs', 'Circumference and area of circles', 'Angle relationships', 'Surface area and volume of prisms', 'Cross sections of solids', 'Probability models', 'Compound events', 'Random sampling and inference']
      },
      {
        n: 'Grade 8 Math', g: 'Grade 8', b: '6-8', h: '140–160 hrs',
        d: 'Linear functions, transformations, and the Pythagorean theorem — the year that prepares students for Algebra 1.',
        u: ['Exponents and scientific notation', 'Roots and irrational numbers', 'Linear equations in one variable', 'Slope and rate of change', 'Graphing linear relationships', 'Systems of linear equations', 'Introduction to functions', 'Comparing functions', 'Rigid transformations and congruence', 'Dilations and similarity', 'The Pythagorean theorem', 'Volume of cylinders, cones, and spheres', 'Scatter plots and bivariate data', 'Two-way tables']
      },
      {
        n: 'Pre-Algebra', g: 'Grades 6–9', b: '6-8', h: '120–140 hrs',
        d: 'A bridge course for students who need the arithmetic behind algebra rebuilt before they take Algebra 1.',
        u: ['Factors, multiples, and primes', 'Fraction and decimal fluency', 'Ratios, rates, and proportions', 'Percent applications', 'Integer operations', 'Order of operations', 'Expressions and the properties of operations', 'One- and two-step equations', 'Inequalities on a number line', 'Roots and scientific notation', 'The coordinate plane', 'Linear patterns and functions', 'Introduction to systems', 'Word problems and modelling']
      },
      {
        n: 'Algebra 1', g: 'Grades 8–10', b: '9-12', h: '150–180 hrs',
        d: 'The core high-school algebra course: linear, exponential, and quadratic relationships, with function notation throughout.',
        u: ['Algebraic foundations', 'Solving linear equations', 'Solving and graphing inequalities', 'Units and modelling', 'Linear functions and graphs', 'Forms of linear equations', 'Systems of equations', 'Systems of inequalities', 'Function notation and domain', 'Arithmetic and geometric sequences', 'Absolute value and piecewise functions', 'Exponent rules and radicals', 'Exponential growth and decay', 'Polynomial multiplication and factoring', 'Solving quadratic equations', 'Quadratic functions and graphs', 'Rational and irrational numbers', 'Data displays and lines of fit']
      },
      {
        n: 'Geometry', g: 'Grades 9–11', b: '9-12', h: '150–180 hrs',
        d: 'A transformation-based geometry course with formal proof, right-triangle trigonometry, and coordinate methods.',
        u: ['Definitions, postulates, and proof', 'Transformations in the plane', 'Congruent triangles', 'Triangle relationships and inequalities', 'Similarity and dilation', 'Right triangle trigonometry', 'Properties of quadrilaterals', 'Polygons and interior angles', 'Circles, arcs, and sectors', 'Coordinate geometry', 'Constructions with compass and straightedge', 'Area of composite figures', 'Surface area and volume', 'Introduction to geometric probability']
      },
      {
        n: 'Algebra 2', g: 'Grades 10–12', b: '9-12', h: '150–180 hrs',
        d: 'Polynomial, rational, radical, exponential, and logarithmic function families, with an introduction to trigonometry.',
        u: ['Polynomial arithmetic', 'Factoring higher-degree polynomials', 'Polynomial division and the remainder theorem', 'Graphs of polynomial functions', 'Rational expressions and equations', 'Radical functions and rational exponents', 'Complex numbers', 'Exponential models', 'Logarithms and logarithmic functions', 'Transformations of functions', 'Inverse functions', 'Sequences and series', 'Introduction to trigonometry', 'Matrices and systems', 'Modelling with functions']
      },
      {
        n: 'Trigonometry', g: 'Grades 10–12', b: '9-12', h: '80–100 hrs',
        d: 'A focused course on angle measure, the unit circle, identities, and triangle solving. Often taken alongside Algebra 2 or before precalculus.',
        u: ['Angle measure and radians', 'Right triangle ratios', 'The unit circle', 'Graphs of sine, cosine, and tangent', 'Amplitude, period, and phase shift', 'Inverse trigonometric functions', 'Fundamental identities', 'Sum, difference, and double-angle formulas', 'Solving trigonometric equations', 'The laws of sines and cosines', 'Polar coordinates', 'Vectors in the plane']
      },
      {
        n: 'Precalculus', g: 'Grades 11–12', b: '9-12', h: '150–180 hrs',
        d: 'The full function toolkit plus vectors, matrices, and a first look at limits — designed to lead directly into calculus.',
        u: ['Function composition and inverses', 'Polynomial and rational functions', 'Exponential and logarithmic models', 'Trigonometric functions', 'Trigonometric identities and equations', 'Polar and parametric equations', 'Vectors', 'Matrices and linear systems', 'Conic sections', 'Sequences and series', 'The binomial theorem', 'Combinatorics and probability', 'Introduction to limits and continuity']
      },
      {
        n: 'Statistics and Probability', g: 'Grades 9–12', b: '9-12', h: '140–170 hrs',
        d: 'A full-year statistics course from data displays through inference, with an emphasis on interpreting results in context.',
        u: ['Categorical data displays', 'Quantitative data displays', 'Measures of centre and spread', 'Normal distributions and z-scores', 'Scatter plots and correlation', 'Least-squares regression', 'Study design and sampling methods', 'Experiments and observational studies', 'Probability rules', 'Conditional probability', 'Random variables and expected value', 'Binomial and geometric distributions', 'Sampling distributions', 'Confidence intervals', 'Significance testing', 'Comparing two groups', 'Chi-square tests']
      },
      {
        n: 'Calculus I', g: 'Grades 11–12', b: '9-12', h: '160–190 hrs',
        d: 'Limits, derivatives, and integrals with applications — equivalent to a first-semester college calculus course.',
        u: ['Limits and continuity', 'The definition of the derivative', 'Differentiation rules', 'Chain rule, implicit, and inverse functions', 'Applied rates of change', 'Related rates', 'Extrema and curve analysis', 'Optimisation', 'Riemann sums and the definite integral', 'The fundamental theorem of calculus', 'Antiderivatives and substitution', 'Separable differential equations', 'Area between curves', 'Volumes of revolution']
      },
      {
        n: 'Calculus II', g: 'Grade 12', b: '9-12', h: '160–190 hrs',
        d: 'Advanced integration, differential equations, parametric and polar calculus, and infinite series.',
        u: ['Integration by parts', 'Trigonometric integrals and substitution', 'Partial fractions', 'Improper integrals', 'Arc length and surface area', 'Differential equations and slope fields', 'Logistic and exponential models', 'Parametric calculus', 'Polar calculus', 'Vector-valued functions', 'Sequences and convergence', 'Series convergence tests', 'Power series', 'Taylor and Maclaurin series']
      },
      {
        n: 'College Algebra', g: 'Grades 11–12', b: '9-12', h: '120–140 hrs',
        d: 'A college-level algebra review for students preparing for placement exams or a first quantitative course.',
        u: ['Linear equations and inequalities', 'Graphs of linear models', 'Function fundamentals', 'Quadratic expressions and equations', 'Quadratic graphs and applications', 'Complex numbers', 'Exponent and radical rules', 'Rational expressions and equations', 'Polynomial arithmetic and factoring', 'Advanced function families', 'Transformations of graphs', 'Exponential and logarithmic equations', 'Systems and matrices', 'Relating algebra and geometry']
      },
      {
        n: 'Financial Mathematics', g: 'Grades 9–12', b: 'Elective', h: '60–80 hrs', e: true,
        d: 'Applied mathematics for money decisions — the arithmetic behind pay, credit, loans, insurance, and investing.',
        u: ['Careers, education, and earning potential', 'Paychecks, withholding, and net pay', 'Banking and account management', 'Budgeting and saving', 'Simple and compound interest', 'Credit cards and credit scores', 'Loans and repayment schedules', 'Buying and financing a car', 'Renting and home ownership', 'Insurance and risk', 'Taxes and tax forms', 'Investing and retirement accounts', 'Scams, fraud, and consumer protection']
      },
      {
        n: 'Linear Algebra', g: 'Advanced elective', b: 'Elective', h: '80–100 hrs', e: true,
        d: 'A first course in vectors, matrices, and linear transformations for students who have finished calculus.',
        u: ['Vectors and vector spaces', 'Linear combinations and span', 'Linear independence and basis', 'Matrix operations', 'Systems and row reduction', 'Determinants', 'Matrix transformations', 'Eigenvalues and eigenvectors', 'Orthogonality and projections', 'Change of basis']
      },
      {
        n: 'Multivariable Calculus', g: 'Advanced elective', b: 'Elective', h: '100–120 hrs', e: true,
        d: 'Calculus extended to functions of several variables, including vector fields and the classical integral theorems.',
        u: ['Functions of several variables', 'Partial derivatives', 'Gradients and directional derivatives', 'Optimisation with constraints', 'Double integrals', 'Triple integrals', 'Change of coordinates', 'Line integrals and vector fields', 'Surface integrals', "Green's, Stokes', and divergence theorems"]
      }
    ]
  },

  {
    subject: 'Science',
    color: 'linear-gradient(160deg, #7fe3a1, #3cba6f)',
    courses: [
      {
        n: 'Elementary Science', g: 'Grades 3–5', b: '3-5', h: '80–100 hrs',
        d: 'An integrated survey of life, physical, and Earth science built around observation and simple hands-on investigations.',
        u: ['Living things and their habitats', 'Life cycles and inherited traits', 'Plants and how they grow', 'Matter and its properties', 'Forces and motion', 'Energy and how it transfers', 'Light and sound', "Earth's systems and materials", 'Weather and climate patterns', 'The solar system', 'Natural resources and conservation', 'Engineering design challenges']
      },
      {
        n: 'Middle School Life Science', g: 'Grades 6–8', b: '6-8', h: '100–120 hrs',
        d: 'From cells to ecosystems, with heredity and evidence for evolution.',
        u: ['Cells and cell processes', 'Body systems and their interactions', 'Growth, development, and reproduction', 'Photosynthesis and respiration', 'Food webs and energy flow', 'Cycles of matter in ecosystems', 'Populations and carrying capacity', 'Biodiversity and ecosystem stability', 'Heredity and traits', 'Genes, chromosomes, and mutation', 'Natural selection and evidence for evolution', 'Human impact on ecosystems']
      },
      {
        n: 'Middle School Earth and Space Science', g: 'Grades 6–8', b: '6-8', h: '100–120 hrs',
        d: "Earth's place in the solar system, the processes that shape its surface, and the systems that drive weather and climate.",
        u: ["Earth's place in space", 'The Sun–Earth–Moon system', 'Seasons, tides, and eclipses', 'Rocks, minerals, and the rock cycle', "Plate tectonics and Earth's interior", 'Earthquakes and volcanoes', 'Weathering, erosion, and landforms', 'The water cycle', 'Weather systems and forecasting', 'Climate zones and climate change', 'Natural resources', 'Natural hazards and mitigation']
      },
      {
        n: 'Middle School Chemistry', g: 'Grades 6–8', b: '6-8', h: '80–100 hrs',
        d: 'The particle model of matter, chemical change, and heat — the conceptual groundwork for high-school chemistry.',
        u: ['Classifying matter', 'States and changes of state', 'Atoms, elements, and the periodic table', 'Physical and chemical properties', 'Chemical reactions', 'Conservation of mass', 'Mixtures and solutions', 'Acids and bases in everyday life', 'Thermal energy and heat transfer']
      },
      {
        n: 'Middle School Physics', g: 'Grades 6–8', b: '6-8', h: '80–100 hrs',
        d: 'Motion, forces, energy, and waves, taught through prediction and measurement rather than formula memorisation.',
        u: ['Describing motion', "Forces and Newton's laws", 'Gravity, magnetism, and electric forces', 'Kinetic and potential energy', 'Energy transfer and conservation', 'Wave properties', 'Sound', 'Light and optics', 'Simple circuits', 'Engineering with forces and energy']
      },
      {
        n: 'High School Biology', g: 'Grades 9–12', b: '9-12', h: '150–180 hrs',
        d: 'A full-year biology course from biochemistry through ecology, with molecular genetics and evolution at the centre.',
        u: ['Biochemistry and macromolecules', 'Cell structure and transport', 'Cellular energetics', 'Photosynthesis and cellular respiration', 'The cell cycle and differentiation', 'DNA, RNA, and protein synthesis', 'Gene expression and regulation', 'Mendelian inheritance', 'Non-Mendelian inheritance and pedigrees', 'Mechanisms of evolution', 'Speciation and phylogeny', 'Classification and the diversity of life', 'Ecology and population dynamics', 'Biotechnology and bioethics']
      },
      {
        n: 'High School Chemistry', g: 'Grades 9–12', b: '9-12', h: '150–180 hrs',
        d: 'Atomic structure through equilibrium and electrochemistry, with quantitative problem solving throughout.',
        u: ['Atomic structure and isotopes', 'Electron configuration and periodic trends', 'Ionic and covalent bonding', 'Molecular geometry', 'Intermolecular forces', 'Chemical reactions and equations', 'The mole and stoichiometry', 'Gas laws', 'Solutions and concentration', 'Thermochemistry', 'Reaction rates', 'Chemical equilibrium', 'Acids, bases, and pH', 'Oxidation–reduction and electrochemistry', 'Nuclear chemistry']
      },
      {
        n: 'High School Physics', g: 'Grades 9–12', b: '9-12', h: '150–180 hrs',
        d: 'Algebra-based physics covering mechanics, waves, electricity and magnetism, and an introduction to modern physics.',
        u: ['Kinematics in one dimension', 'Kinematics in two dimensions', "Newton's laws and free-body diagrams", 'Circular motion and gravitation', 'Work, energy, and power', 'Momentum and collisions', 'Rotational motion and torque', 'Simple harmonic motion', 'Waves and sound', 'Geometric optics', 'Electrostatics', 'Circuits', 'Magnetism and induction', 'Modern and nuclear physics']
      },
      {
        n: 'Environmental Science', g: 'Grades 9–12', b: '9-12', h: '120–150 hrs',
        d: 'How natural systems work, how human activity changes them, and how policy and technology respond.',
        u: ['Ecosystems and biodiversity', 'Population dynamics', 'Earth systems and natural resources', 'Soil, agriculture, and land use', 'Water resources and management', 'Energy sources and consumption', 'Air pollution and air quality', 'Water and soil pollution', 'Waste management and recycling', 'Climate change and the global response', 'Sustainability and environmental policy', 'Field investigation project']
      },
      {
        n: 'Anatomy and Physiology', g: 'Grades 10–12', b: 'Elective', h: '120–140 hrs', e: true,
        d: 'A systems tour of the human body for students considering health careers.',
        u: ['Organisation of the human body', 'The skeletal system', 'The muscular system', 'The circulatory system', 'The respiratory system', 'The digestive system', 'The nervous system and the brain', 'The endocrine system', 'The immune system and infectious disease', 'The urinary system', 'The reproductive system', 'Nutrition, health, and disease prevention']
      },
      {
        n: 'Astronomy and Cosmology', g: 'Grades 9–12', b: 'Elective', h: '60–80 hrs', e: true,
        d: 'From the motion of the night sky to the expansion of the universe, with observation projects families can do at home.',
        u: ['Scale of the universe', 'The night sky and celestial motion', 'Telescopes and observation', 'The solar system', 'Moons, comets, and asteroids', 'The Sun and stellar physics', 'Stars and stellar evolution', 'Galaxies and black holes', 'The Big Bang and cosmic expansion', 'Exoplanets and the search for life']
      },
      {
        n: 'Organic Chemistry', g: 'Advanced elective', b: 'Elective', h: '120–150 hrs', e: true,
        d: 'Reaction mechanisms and structure determination for students who have completed high-school chemistry.',
        u: ['Structure and bonding', 'Functional groups and nomenclature', 'Alkanes and cycloalkanes', 'Stereochemistry', 'Substitution reactions', 'Elimination reactions', 'Alkenes and alkynes', 'Alcohols, ethers, and epoxides', 'Conjugation and aromaticity', 'Aromatic substitution', 'Aldehydes and ketones', 'Carboxylic acids and derivatives', 'Amines', 'Spectroscopy and structure determination']
      }
    ]
  },

  {
    subject: 'Social Studies',
    color: 'linear-gradient(160deg, #f6b26b, #e8833a)',
    courses: [
      {
        n: 'Elementary Social Studies', g: 'Grades 3–5', b: '3-5', h: '60–80 hrs',
        d: 'Communities, maps, and the basics of government and economics, anchored in the student’s own state and town.',
        u: ['Communities and how they work', 'Maps, globes, and geography skills', 'Regions of the United States', 'Native nations and early settlement', 'State and local history', 'Government at three levels', 'Citizenship and civic responsibility', 'Needs, wants, goods, and services', 'Culture, holidays, and traditions', 'Using sources like a historian']
      },
      {
        n: 'World Geography', g: 'Grades 6–9', b: '6-8', h: '90–110 hrs',
        d: 'Physical and human geography region by region, with map skills and data reading built into every unit.',
        u: ['Reading maps and spatial data', 'Physical geography and landforms', 'Climate zones and biomes', 'Population and migration', 'Cities and urbanisation', 'Culture regions and language', 'Religion and cultural landscapes', 'Economic geography and trade', 'North and South America', 'Europe and Russia', 'Africa and the Middle East', 'Asia and Oceania', 'Environment and human impact']
      },
      {
        n: 'Civics and Government', g: 'Grades 6–9', b: '6-8', h: '80–100 hrs',
        d: 'How American government is built, what it does, and how a citizen participates in it.',
        u: ['Why government exists', 'Founding documents and principles', 'Federalism and the levels of government', 'The legislative branch', 'The executive branch', 'The judicial branch', 'How a bill becomes law', 'Rights and civil liberties', 'Civil rights and social movements', 'Voting and elections', 'Political parties and the media', 'State and local government', 'Being an active citizen']
      },
      {
        n: 'US History', g: 'Grades 8–11', b: '9-12', h: '140–170 hrs',
        d: 'A survey from before contact to the present, taught with primary sources and document-based writing.',
        u: ['Indigenous America and first contact', 'Colonial settlement and slavery', 'Revolution and independence', 'The Constitution and the early republic', 'Expansion, reform, and the frontier', 'Sectionalism and the Civil War', 'Reconstruction', 'Industrialisation and immigration', 'The Progressive Era', 'Imperialism and the First World War', 'The 1920s and the Great Depression', 'The New Deal', 'The Second World War', 'The Cold War at home and abroad', 'The civil rights movement', 'The late twentieth century', 'The United States since 2000']
      },
      {
        n: 'World History', g: 'Grades 9–12', b: '9-12', h: '140–170 hrs',
        d: 'A thematic survey of connection, exchange, and conflict from the first societies to the present.',
        u: ['Early humans and the first societies', 'River valley civilisations', 'Classical empires and belief systems', 'Trade networks across Afro-Eurasia', 'Medieval states and cultural exchange', 'Land-based empires', 'Exploration and the first global age', 'The Atlantic world and forced migration', 'Enlightenment and revolutions', 'Industrialisation', 'Imperialism and resistance', 'The world wars', 'Decolonisation and the Cold War', 'Globalisation and the contemporary world']
      },
      {
        n: 'US Government and Politics (advanced)', g: 'Grades 11–12', b: '9-12', h: '120–140 hrs',
        d: 'A college-level treatment of institutions, behaviour, and constitutional interpretation, with required case study readings.',
        u: ['Foundations of American democracy', 'The constitutional convention and ratification debate', 'Interactions among the branches', 'Bureaucracy and policy implementation', 'Civil liberties and the Bill of Rights', 'Civil rights and the Fourteenth Amendment', 'Landmark Supreme Court cases', 'Political ideologies and beliefs', 'Public opinion and polling', 'Political participation and voting behaviour', 'Campaigns, parties, and interest groups', 'Media and political communication']
      },
      {
        n: 'Economics', g: 'Grades 9–12', b: '9-12', h: '100–120 hrs',
        d: 'Microeconomics and macroeconomics in one course, with real data from labour markets and national accounts.',
        u: ['Scarcity, choice, and opportunity cost', 'Supply and demand', 'Markets, prices, and surplus', 'Elasticity', 'Firms, costs, and competition', 'Market structures', 'Labour markets and wages', 'Market failure and government intervention', 'Measuring the economy: GDP, inflation, unemployment', 'Money and banking', 'Fiscal policy', 'Monetary policy and the central bank', 'International trade and exchange rates', 'Economic growth and development']
      },
      {
        n: 'Personal Finance', g: 'Grades 8–12', b: '9-12', h: '50–70 hrs',
        d: 'A practical course on managing money, built around documents students will actually encounter.',
        u: ['Setting financial goals', 'Income, paychecks, and benefits', 'Building a budget', 'Saving and emergency funds', 'Checking and savings accounts', 'Credit cards and credit scores', 'Student loans and debt repayment', 'Buying and insuring a car', 'Renting and home ownership', 'Types of insurance', 'Taxes and filing a return', 'Investing basics and compound growth', 'Retirement accounts', 'Recognising scams and fraud']
      },
      {
        n: 'Art History', g: 'Grades 9–12', b: 'Elective', h: '90–110 hrs', e: true,
        d: 'A global survey of visual culture, with close looking at individual works in every unit.',
        u: ['How to look at art', 'Prehistoric and ancient art', 'Classical Greece and Rome', 'Byzantine and medieval art', 'Art of the Islamic world', 'The Italian Renaissance', 'The Northern Renaissance', 'Baroque and Rococo', 'Art of South and East Asia', 'Art of Africa and the Indigenous Americas', 'Art of the Pacific', 'Nineteenth-century movements', 'Modernism and the avant-garde', 'Contemporary and global art']
      },
      {
        n: 'Psychology', g: 'Grades 11–12', b: 'Elective', h: '100–120 hrs', e: true,
        d: 'An introduction to the science of behaviour and mental processes, including research methods and statistics in context.',
        u: ['Scientific foundations of psychology', 'Research methods and ethics', 'Biological bases of behaviour', 'Sensation and perception', 'Consciousness and sleep', 'Learning and conditioning', 'Memory', 'Cognition, language, and intelligence', 'Developmental psychology', 'Motivation and emotion', 'Personality theories', 'Psychological disorders', 'Treatment and therapy', 'Social psychology']
      }
    ]
  },

  {
    subject: 'Languages',
    color: 'linear-gradient(160deg, #9f7bec, #7048c9)',
    note: 'Our Languages department covers two tracks: English language arts for native and fluent speakers, and world languages taught from the beginning.',
    courses: [
      {
        n: 'Reading and Vocabulary, Grades 2–3', g: 'Grades 2–3', b: 'K-2', h: '70–90 hrs', track: 'English language arts',
        d: 'Decoding, fluency, and the first comprehension strategies, with a vocabulary bank the student builds over the year.',
        u: ['Phonics review and word attack', 'Reading fluency and expression', 'Story elements: character, setting, plot', 'Main idea and supporting details', 'Sequence and retelling', 'Context clues', 'Prefixes, suffixes, and roots', 'Reading informational texts', 'Asking and answering questions about a text', 'Building a personal word bank']
      },
      {
        n: 'Reading and Vocabulary, Grades 4–5', g: 'Grades 4–5', b: '3-5', h: '80–100 hrs', track: 'English language arts',
        d: 'Summary, theme, and text structure, with a first look at how authors build an argument.',
        u: ['Summarising a text', 'Theme and central message', 'Character development and motivation', 'Point of view', 'Text structure in nonfiction', 'Comparing two texts on one topic', 'Figurative language', 'Author’s craft and word choice', 'Academic vocabulary', 'Greek and Latin roots']
      },
      {
        n: 'Reading and Vocabulary, Grades 6–8', g: 'Grades 6–8', b: '6-8', h: '90–110 hrs', track: 'English language arts',
        d: 'Close reading and evidence-based analysis across fiction, nonfiction, poetry, and drama.',
        u: ['Close reading and annotation', 'Central idea and supporting evidence', 'Author’s purpose and tone', 'Argument, claim, and counterclaim', 'Evaluating evidence and reasoning', 'Analysing poetry', 'Analysing drama', 'Comparing accounts across media', 'Word relationships and connotation', 'Domain-specific vocabulary']
      },
      {
        n: 'Reading and Literature, Grades 9–12', g: 'Grades 9–12', b: '9-12', h: '120–150 hrs', track: 'English language arts',
        d: 'A literature course organised by form, with historical context and comparative reading built in.',
        u: ['Literary analysis essentials', 'The short story', 'The novel', 'Poetry and poetic form', 'Drama and Shakespeare', 'Rhetoric and persuasive texts', 'Nonfiction and the essay', 'Historical and cultural context', 'Literary criticism and lenses', 'Comparative and world literature', 'Research and source evaluation', 'Independent reading project']
      },
      {
        n: 'Grammar and Usage, Grades 3–8', g: 'Grades 3–8', b: '3-5', h: '50–70 hrs', track: 'English language arts',
        d: 'A reference-style course students can take straight through or dip into when a specific rule causes trouble.',
        u: ['Parts of speech', 'Sentence structure and types', 'Subject–verb agreement', 'Verb tense and aspect', 'Pronouns and antecedents', 'Adjectives, adverbs, and modifiers', 'Phrases and clauses', 'Punctuation', 'Capitalisation and spelling patterns', 'Commonly confused words', 'Editing for clarity']
      },
      {
        n: 'Writing and Composition, Grades 4–8', g: 'Grades 4–8', b: '6-8', h: '70–90 hrs', track: 'English language arts',
        d: 'The full writing process across four modes, with revision treated as a skill in its own right.',
        u: ['The writing process', 'Narrative writing', 'Descriptive writing', 'Informative and explanatory writing', 'Opinion and argument writing', 'Paragraph structure', 'Organising a multi-paragraph essay', 'Transitions and cohesion', 'Revising and editing', 'Finding and citing sources', 'Publishing and presenting']
      },
      {
        n: 'Academic Writing, Grades 9–12', g: 'Grades 9–12', b: '9-12', h: '80–100 hrs', track: 'English language arts',
        d: 'Thesis-driven writing for high school and college, including the research paper and the application essay.',
        u: ['Thesis and argument', 'Evidence and analysis', 'Essay organisation', 'Rhetorical strategies', 'Counterargument and concession', 'The research paper', 'Citation styles and academic honesty', 'Style, voice, and sentence variety', 'Timed and on-demand writing', 'The college application essay', 'Peer review and revision']
      },
      {
        n: 'Speaking and Listening, Grades 6–12', g: 'Grades 6–12', b: 'Elective', h: '40–60 hrs', e: true, track: 'English language arts',
        d: 'Presentation, discussion, and debate skills, practised out loud and recorded for parent review.',
        u: ['Preparing a presentation', 'Delivery, pacing, and body language', 'Visual aids that help', 'Academic discussion norms', 'Structured debate', 'Active listening and note-taking', 'Evaluating spoken arguments', 'Interviewing and asking questions', 'Collaborative projects']
      },
      {
        n: 'English as an Additional Language: Foundations', g: 'Beginner', b: 'Elective', h: '80–100 hrs', e: true, track: 'English for new speakers',
        d: 'For students whose first language is not English. Everyday communication first, academic English second.',
        u: ['Survival vocabulary', 'Sounds, stress, and pronunciation', 'Present simple and present continuous', 'Nouns, articles, and plurals', 'Basic question forms', 'Everyday conversations', 'Numbers, time, and money', 'Reading short texts', 'Writing simple sentences', 'Listening for key information']
      },
      {
        n: 'English as an Additional Language: Intermediate', g: 'Intermediate', b: 'Elective', h: '90–110 hrs', e: true, track: 'English for new speakers',
        d: 'Bridging from conversational English to the academic English needed for other courses.',
        u: ['Past and future tenses', 'Perfect tenses', 'Modal verbs', 'Conditionals', 'Passive voice', 'Phrasal verbs and collocations', 'Academic vocabulary', 'Reading longer texts for detail', 'Paragraph and essay writing', 'Note-taking from lectures', 'Discussion and presentation skills']
      },
      {
        n: 'Spanish I', g: 'Grades 6–12 · Novice', b: '6-8', h: '100–120 hrs', track: 'World languages',
        d: 'A first year of Spanish built around speaking from day one.',
        u: ['Greetings and introductions', 'The alphabet and pronunciation', 'Numbers, dates, and time', 'Nouns, articles, and gender', 'Present tense of regular verbs', 'Ser and estar', 'Common irregular verbs', 'Adjectives and agreement', 'Family and describing people', 'Daily routine', 'Food and ordering', 'School and the classroom', 'Asking questions', 'Culture: the Spanish-speaking world']
      },
      {
        n: 'Spanish II', g: 'Grades 7–12 · Novice high', b: '9-12', h: '100–120 hrs', track: 'World languages',
        d: 'The past tenses, pronouns, and commands — the year where students start telling stories rather than listing facts.',
        u: ['Preterite tense', 'Imperfect tense', 'Choosing between preterite and imperfect', 'Reflexive verbs', 'Direct and indirect object pronouns', 'Formal and informal commands', 'Comparisons and superlatives', 'Travel and directions', 'Health and the body', 'Shopping and money', 'Weather and seasons', 'Culture: festivals and traditions']
      },
      {
        n: 'Spanish III', g: 'Grades 9–12 · Intermediate', b: '9-12', h: '110–130 hrs', track: 'World languages',
        d: 'The subjunctive, complex tenses, and reading authentic texts. Discussion and written opinion become the main assessments.',
        u: ['The present subjunctive', 'The imperfect subjunctive', 'Future and conditional', 'Perfect tenses', 'Por and para', 'Relative pronouns', 'Passive and impersonal constructions', 'Expressing opinion and debating', 'Reading short literary texts', 'Formal and informal writing', 'Culture: film, music, and current events']
      },
      {
        n: 'French I', g: 'Grades 6–12 · Novice', b: '6-8', h: '100–120 hrs', track: 'World languages',
        d: 'A first year of French with heavy emphasis on pronunciation and listening, since French spelling and sound diverge early.',
        u: ['Greetings and classroom language', 'Pronunciation, accents, and liaison', 'Numbers, dates, and time', 'Nouns, articles, and gender', 'Present tense of -er, -ir, and -re verbs', 'Être, avoir, aller, and faire', 'Adjective agreement and placement', 'Family and home', 'Food and cafés', 'Hobbies and free time', 'Asking questions', 'Culture: France and la Francophonie']
      },
      {
        n: 'French II', g: 'Grades 7–12 · Novice high', b: '9-12', h: '100–120 hrs', track: 'World languages',
        d: 'Narrating in the past, using pronouns naturally, and handling practical situations abroad.',
        u: ['Passé composé', 'Imparfait', 'Choosing between past tenses', 'Reflexive verbs', 'Object and adverbial pronouns', 'Futur proche and futur simple', 'Comparisons', 'Travel and transport', 'Health and daily life', 'Shopping and services', 'Housing and city life', 'Culture: art, cuisine, and cinema']
      },
      {
        n: 'German I', g: 'Grades 7–12 · Novice', b: '9-12', h: '100–120 hrs', track: 'World languages',
        d: 'A first year of German that treats the case system as the central skill rather than an afterthought.',
        u: ['Pronunciation and the alphabet', 'Greetings and small talk', 'Numbers, dates, and time', 'Nouns, gender, and articles', 'Present tense verbs', 'The nominative case', 'The accusative case', 'Word order and sentence structure', 'Modal verbs', 'Separable-prefix verbs', 'Family and home', 'Food and shopping', 'Culture: German-speaking countries']
      },
      {
        n: 'Mandarin Chinese I', g: 'Grades 7–12 · Novice', b: '9-12', h: '110–130 hrs', track: 'World languages',
        d: 'Tones and characters from the start, with handwriting practice and audio drills built into every unit.',
        u: ['Pinyin and the four tones', 'Greetings and self-introduction', 'Numbers, dates, and time', 'Basic sentence patterns', 'Measure words', 'Questions and question particles', 'Character writing fundamentals', 'Radicals and character components', 'Family and occupations', 'Food and ordering', 'Shopping and money', 'Directions and places', 'Culture: festivals and everyday life']
      },
      {
        n: 'Latin I', g: 'Grades 8–12 · Novice', b: 'Elective', h: '90–110 hrs', e: true, track: 'World languages',
        d: 'A reading-focused first year of Latin, with English vocabulary building as a deliberate side effect.',
        u: ['Pronunciation and reading aloud', 'Nouns and the first declension', 'The second declension', 'Present tense conjugations', 'Cases and their uses', 'Adjectives and agreement', 'The third declension', 'Imperfect and perfect tenses', 'Prepositions and ablative uses', 'Reading adapted passages', 'Latin roots in English', 'Culture: Roman daily life']
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

  var totalCourses = 0, totalUnits = 0;

  var html = '';
  CATALOG.forEach(function (group) {
    var courses = '';
    group.courses.forEach(function (c) {
      totalCourses++;
      totalUnits += c.u.length;
      var haystack = (c.n + ' ' + c.g + ' ' + c.d + ' ' + (c.track || '') + ' ' + c.u.join(' ')).toLowerCase();
      var units = c.u.map(function (u) { return '<li>' + esc(u) + '</li>'; }).join('');
      courses +=
        '<details class="course-item" data-subject="' + esc(group.subject) + '" data-band="' + esc(c.b) + '" data-text="' + esc(haystack) + '">' +
          '<summary>' +
            '<span class="course-name">' + esc(c.n) + '</span>' +
            '<span class="course-meta">' +
              '<span class="meta-pill">' + esc(c.g) + '</span>' +
              '<span class="meta-pill">' + c.u.length + ' units</span>' +
              '<span class="meta-pill">' + esc(c.h) + '</span>' +
              (c.track ? '<span class="meta-pill">' + esc(c.track) + '</span>' : '') +
              (c.e ? '<span class="meta-pill is-elective">Elective</span>' : '') +
            '</span>' +
            '<span class="course-toggle" aria-hidden="true">+</span>' +
          '</summary>' +
          '<div class="course-body">' +
            '<p class="course-blurb">' + esc(c.d) + '</p>' +
            '<p class="units-label">Scope and sequence</p>' +
            '<ol class="units">' + units + '</ol>' +
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

  function apply() {
    var shown = 0;
    var q = state.q.trim().toLowerCase();

    items.forEach(function (item) {
      var ok =
        (state.subject === 'all' || item.dataset.subject === state.subject) &&
        (state.band === 'all' || item.dataset.band === state.band) &&
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
