export const cities = [
    "Abbottabad", "Adezai", "Ahmed Nager", "Ahmadpur East", "Akora Khattak", "Ali Khan", "Alipur", "Alpuri", "Arifwala", "Attock", "Awaran", "Ayubia",
    "Badin", "Banda Daud", "Bannu", "Barkhan", "Batkhela", "Battagram", "Bhalwal", "Bhera", "Bhirkan", "Bhakkar", "Birote", "Bahawalnagar", "Bahawalpur",
    "Burewala", "Chagai", "Chak", "Chakdara", "Chakwal", "Charsadda", "Chichawatni", "Chillianwala", "Chiniot", "Chishtian", "Chitral", "Dadu", "Daggar",
    "Dargai", "Darya Khan", "Darya Khan", "dera Ismail", "Dera Bugti", "Dera Ghazi", "Digri", "Dina", "Dinga", "Diplo", "Dipalpur", "Dokri", "Doaba", "Drosh",
    "Faisalabad", "Fateh Jhang", "Ghakhar Mandi", "Ghotki", "Gojra", "Gujranwala", "Gujar Khan", "Gujrat", "Gwadar", "Haala", "Hafizabad", "Hangu", "Haripur",
    "Haroonabad", "Harnai", "Hasilpur", "Haveli", "Hyderabad", "Islamabad", "Islamkot", "Jacobabad", "Jafarabad", "Jalalpur", "Jampur", "Jamshoro", "Jaranwala",
    "Jati", "Jauharabad", "Jattan", "Jhang", "Jhelum", "Jhal Magsi", "Jungshahi", "Kalabagh", "Kalat", "Kalat", "Kamalia", "Kamoke", "Kandhkot", "Kandiaro",
    "Karachi", "Karak", "Kashmore", "Kasur", "Keti Bandar", "Khanewal", "Khanpur", "Kharan", "Kharian", "Khairpur", "Khushab", "Killa Abdullah", "Killa Saifullah",
    "Kot Adu", "Kotri", "Kulachi", "Kohlu", "Kohat", "Kotri", "Lahore", "Lakha", "Lakki Marwat", "Lalamusa", "Latamber", "Layyah", "Lehri", "Liaquat Pur", "Lodhran",
    "Loralai", "Malakwal", "Mamoori", "Mailsi", "Mandi Bahauddin", "Mansehra", "Mardan", "Mastuj", "Mastung", "Mehar", "Mehrabpur", "Mian Channu", "Mianwali",
    "Mianwali Bangla", "Mithi", "Mithi", "Multan", "Murree", "Muridke", "Muzaffargarh", "Nagarparkar", "Narowal", "Nazimabad", "Naudero", "Naukot", "Nawabshah",
    "Naushahro Feroze", "Naushara", "Nowshera", "Nushki", "Okara", "Pabbi", "Paharpur", "Pakpattan", "Panjgur", "Peshawar", "Pishin valley", "Pir Mahal", "Qaimpur",
    "Qambar", "Qasimabad", "Qila Didar", "Quetta", "Rahim Yar", "Rajanpur", "Rajo Khanani", "Ranipur", "Ratodero", "Rawalpindi", "Renala Khurd", "Rohri", "Sadiqabad",
    "Safdarabad", "Sahiwal", "Saidu Sharif", "Sakrand", "Sanghar", "Sangla Hill", "Sarai Alamgir", "Sargodha", "Shahbandar", "Shahdadkot", "Shahdadpur", "Shahpur Chakar",
    "Sheikhupura", "Sherani", "Shikarpur", "Shorkot", "Shikarpaur", "Shewa Adda", "Sibi", "Sialkot", "Siranwali", "Sohbatpur", "Sohawa", "Soianwala", "Swabi", "Swat",
    "Talagang", "Tando Adam", "Tando Allahyar", "Tando Muhammad", "Tank", "Taxila", "Thall", "Thatta", "Timergara", "Toba Tek", "Tordher", "Umerkot", "Vehari", "Wah Cantonment",
    "Warah", "Washuk", "Wazirabad", "Zhob", "Ziarat"
];


export const citiesWithLabelValue = cities.map(city => ({
    label: city,
    value: city.toLowerCase() // Assuming value should be in lowercase
}));

export const prefOptions = [
    {
        label: "On - Site",
        value: "onsite",
    },
    {
        label: "Hybrid",
        value: "hybrid",
    },
    {
        label: "Remote",
        value: "remote",
    },
]

export const availibilityOptions = [
    {
        label: "Less than 1 month",
        value: "Less than 1 month"
    },
    {
        label: "1 Month",
        value: "1 Month"
    },
    {
        label: "2 Months",
        value: "2 Months"
    },
    {
        label: "More than 2 Months",
        value: "More than 2 Months"
    },
]

export const educationOption = [
    {
        label: "Intermediate",
        value: "Intermediate"
    },
    {
        label: "Bachelor",
        value: "Bachelor"
    },
    {
        label: "Master",
        value: "Master"
    },
]

export const jobTypeOptions = [

    {
        label:"Full Time",
        value:"full-time"
    },
    {
        label:"Part Time",
        value:"part-time"
    },
    {
        label:"Contract",
        value:"contract"
    }
]


export const field = [
    { value: 'Software Engineering', label: 'Software Engineering' },
    { value: 'Hardware Design', label: 'Hardware Design' },
    { value: 'Mechanical', label: 'Mechanical' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
];


export const subField = {
    ['Software Engineering']: [
        { value: 'Principal Engineer', label: 'Principal Engineer' },
        { value: 'Cyber Security Engineer', label: 'Cyber Security Engineer' },
        { value: 'SQA Engineer', label: 'SQA Engineer' },
        { value: 'Python Developers', label: 'Python Developers' },
        { value: 'Dot Net Developer', label: 'Dot Net Developer' },
        { value: 'Full-Stack Developer', label: 'Full-Stack Developer' },
        { value: 'LUA Developer', label: 'LUA Developer' },
    ],
    ['Hardware Design']: [
        { value: 'Hardware Designer', label: 'Hardware Designer' },
        { value: 'Design Engineer', label: 'Design Engineer' },
        { value: 'Firmware Engineer', label: 'Firmware Engineer' },
        { value: 'Embedded Firmware Engineer', label: 'Embedded Firmware Engineer' },
        { value: 'Hardware Test Engineer', label: 'Hardware Test Engineer' },
        { value: 'Circuit Design Engineer', label: 'Circuit Design Engineer' },
        { value: 'Hardware Architect', label: 'Hardware Architect' },
        { value: 'Digital Design Engineer', label: 'Digital Design Engineer' },
        { value: 'System-on-Chip (SoC) Architect', label: 'System-on-Chip (SoC) Architect' },
        { value: 'Hardware/Software Co-Design Engineer', label: 'Hardware/Software Co-Design Engineer' },
        { value: 'Hardware/Software Integration Engineer', label: 'Hardware/Software Integration Engineer' },
        { value: 'Hardware/Software Integration Engineer', label: 'Hardware/Software Integration Engineer' },
        { value: 'System Software Engineer', label: 'System Software Engineer' },
        { value: 'Hardware-Driven Software Developer', label: 'Hardware-Driven Software Developer' },
        { value: 'PCB Designer', label: 'PCB Designer' }
    ],
    ['Mechanical']: [
        { value: 'Mechanical Designer', label: 'Mechanical Designer' },
        { value: 'Mechanical Design Engineer', label: 'Mechanical Design Engineer' },
        { value: 'Design Engineer', label: 'Design Engineer' },
        { value: '3D Designer', label: '3D Designer' },
        { value: '3D Visualizer', label: '3D Visualizer' },
        { value: '3D Motion Designer', label: '3D Motion Designer' },
        { value: 'Simulation Engineer', label: 'Simulation Engineer' },
        { value: 'Assistant Mechanical Engineer', label: 'Assistant Mechanical Engineer' },
        { value: 'MEP Engineer', label: 'MEP Engineer' },
        { value: 'Mechatronics Engineer', label: 'Mechatronics Engineer' },
        { value: 'Robotics Design Engineer', label: 'Robotics Design Engineer' },
        { value: 'Sr. Mechanical Designer', label: 'Sr. Mechanical Designer' },
        { value: 'CAD Expert', label: 'CAD Expert' },
        { value: '3D Renderings Expert', label: '3D Renderings Expert' },
        { value: 'CAD Specialist', label: 'CAD Specialist' },
        { value: '2D and 3D CAD Specialist', label: '2D and 3D CAD Specialist' },
        { value: 'Floor Plan Maker', label: 'Floor Plan Maker' },
        { value: 'HVAC Project Engineer', label: 'HVAC Project Engineer' },
        { value: 'Product Designer', label: 'Product Designer' },
        { value: 'P&ID Designer', label: 'P&ID Designer' },
        { value: 'P&ID Specialist', label: 'P&ID Specialist' },
        { value: 'Sr. Design Engineer', label: 'Sr. Design Engineer' },
        { value: 'Revit Designer', label: 'Revit Designer' }
    ],
    ['Human Resources']: [
        { value: 'Director Human Resource', label: 'Director Human Resource' },
        { value: 'Director Talent Acquisition', label: 'Director Talent Acquisition' },
        { value: 'Manager Human Resource', label: 'Manager Human Resource' },
        { value: 'Manager Talent Acquisition', label: 'Manager Talent Acquisition' },
        { value: 'Assistant HR Manager', label: 'Assistant HR Manager' },
        { value: 'Assistant HR Officer', label: 'Assistant HR Officer' },
        { value: 'HR Executive', label: 'HR Executive' },
        { value: 'Recruitment Specialist/Recruiter', label: 'Recruitment Specialist/Recruiter' },
        { value: 'Workforce Planning and Talent Management Specialist', label: 'Workforce Planning and Talent Management Specialist' },
        { value: 'HR Generalist', label: 'HR Generalist' },
        { value: 'Employee Relations Specialist', label: 'Employee Relations Specialist' },
        { value: 'Learning and Development Specialist', label: 'Learning and Development Specialist' },
        { value: 'Compensation and Benefits Analyst', label: 'Compensation and Benefits Analyst' },
        { value: 'HR Business Partner', label: 'HR Business Partner' },
        { value: 'Organizational Development (OD) Consultant', label: 'Organizational Development (OD) Consultant' },
        { value: 'HR Compliance Specialist', label: 'HR Compliance Specialist' },
        { value: 'Benefits Administrator', label: 'Benefits Administrator' },
        { value: 'Employee Engagement Specialist', label: 'Employee Engagement Specialist' },
        { value: 'HR Compliance Auditor', label: 'HR Compliance Auditor' },
        { value: 'HR Training Coordinator', label: 'HR Training Coordinator' },
        { value: 'Labor Relations Specialist', label: 'Labor Relations Specialist' },
        { value: 'Employee Experience Specialist', label: 'Employee Experience Specialist' }
    ],
    ['Marketing']: [
        { value: 'Marketing Director', label: 'Marketing Director' },
        { value: 'Marketing Manager', label: 'Marketing Manager' },
        { value: 'Marketing Executive', label: 'Marketing Executive' },
        { value: 'Brand Manager', label: 'Brand Manager' },
        { value: 'Digital Marketing Specialist', label: 'Digital Marketing Specialist' },
        { value: 'LinkedIn Marketing Specialist', label: 'LinkedIn Marketing Specialist' },
        { value: 'Content Marketing Manager', label: 'Content Marketing Manager' },
        { value: 'Social Media Manager', label: 'Social Media Manager' },
        { value: 'Public Relations (PR) Manager', label: 'Public Relations (PR) Manager' },
        { value: 'Performance Marketer', label: 'Performance Marketer' },
        { value: 'Market Research Analyst', label: 'Market Research Analyst' },
        { value: 'Marketing Communications Manager', label: 'Marketing Communications Manager' },
        { value: 'Product Marketing Manager', label: 'Product Marketing Manager' },
        { value: 'Event Marketing Manager', label: 'Event Marketing Manager' },
        { value: 'Email Marketing Specialist', label: 'Email Marketing Specialist' },
        { value: 'Marketing Analytics Manager', label: 'Marketing Analytics Manager' },
        { value: 'Creative Director', label: 'Creative Director' },
        { value: 'SEO Specialist', label: 'SEO Specialist' },
        { value: 'Demand Generation Specialist', label: 'Demand Generation Specialist' },
        { value: 'E-Commerce Specialist', label: 'E-Commerce Specialist' },
        { value: 'Channel Marketing Manager', label: 'Channel Marketing Manager' },
        { value: 'Influencer Marketing Manager', label: 'Influencer Marketing Manager' },
        { value: 'Marketing Automation Specialist', label: 'Marketing Automation Specialist' },
        { value: 'Search Engine Marketing (SEM) Specialist', label: 'Search Engine Marketing (SEM) Specialist' },
        { value: 'Customer Marketing Manager', label: 'Customer Marketing Manager' },
        { value: 'Retail Marketing Manager', label: 'Retail Marketing Manager' },
        { value: 'Brand Partnerships Manager', label: 'Brand Partnerships Manager' },
        { value: 'Customer Experience Manager', label: 'Customer Experience Manager' },
        { value: 'Marketing Content Specialist', label: 'Marketing Content Specialist' },
        { value: 'Marketing Operations Specialist', label: 'Marketing Operations Specialist' },
        { value: 'Marketing Operations Manager', label: 'Marketing Operations Manager' },
        { value: 'Marketing Data Scientist', label: 'Marketing Data Scientist' },
        { value: 'Marketing Compliance Officer', label: 'Marketing Compliance Officer' },
        { value: 'Email Marketer', label: 'Email Marketer' },
        { value: 'Affiliate Marketing Manager', label: 'Affiliate Marketing Manager' },
        { value: 'Experiential Marketing Manager', label: 'Experiential Marketing Manager' },
        { value: 'Market Development Manager', label: 'Market Development Manager' },
        { value: 'Brand Strategist', label: 'Brand Strategist' },
        { value: 'Marketing Copywriter', label: 'Marketing Copywriter' },
        { value: 'Content Writer', label: 'Content Writer' },
        { value: 'Technical Content Writer', label: 'Technical Content Writer' },
        { value: 'Inbound Marketing Manager', label: 'Inbound Marketing Manager' },
        { value: 'Marketing Channel Analyst', label: 'Marketing Channel Analyst' },
        { value: 'PPC Expert', label: 'PPC Expert' },
        { value: 'Product Researcher', label: 'Product Researcher' },
        { value: 'Marketing Compliance Specialist', label: 'Marketing Compliance Specialist' },
        { value: 'Mobile Marketing Manager', label: 'Mobile Marketing Manager' },
        { value: 'Video Editor', label: 'Video Editor' },
        { value: 'UI/UX Designer', label: 'UI/UX Designer' },
        { value: 'Graphic Designer', label: 'Graphic Designer' }
    ],
    ['Sales']: [
        { value: 'Sales Representative/Sales Executive', label: 'Sales Representative/Sales Executive' },
        { value: 'Business Development Manager', label: 'Business Development Manager' },
        { value: 'Business Development Executive', label: 'Business Development Executive' },
        { value: 'Freelance Bidder', label: 'Freelance Bidder' },
        { value: 'Lead Generation', label: 'Lead Generation' },
        { value: 'Sales Representative', label: 'Sales Representative' },
        { value: 'Sales Development Representative', label: 'Sales Development Representative' },
        { value: 'Sales Manager', label: 'Sales Manager' },
        { value: 'Inside Sales Representative', label: 'Inside Sales Representative' },
        { value: 'Outside Sales Representative', label: 'Outside Sales Representative' },
        { value: 'Sales Engineer', label: 'Sales Engineer' },
        { value: 'Sales Force Engineer', label: 'Sales Force Engineer' },
        { value: 'Channel Sales Manager', label: 'Channel Sales Manager' },
        { value: 'Salesforce Administrator', label: 'Salesforce Administrator' },
        { value: 'Sales Compensation Manager', label: 'Sales Compensation Manager' },
        { value: 'Sales Coordinator', label: 'Sales Coordinator' },
        { value: 'Sales Account Coordinator', label: 'Sales Account Coordinator' },
        { value: 'Product Marketer', label: 'Product Marketer' }
    ],
};

export const positionBysubfields = {
    ['Principal Engineer']: [
        { value: 'Technical Leadership and Vision', label: 'Technical Leadership and Vision' },
        { value: 'Architecture Design and Review', label: 'Architecture Design and Review' },
        { value: 'Innovation and Research', label: 'Innovation and Research' },
        { value: 'Technical Strategy and Roadmap', label: 'Technical Strategy and Roadmap' },
        { value: 'Quality Assurance and Continuous Improvement', label: 'Quality Assurance and Continuous Improvement' },
    ],
    ['Cyber Security Engineer']: [
        { value: 'Penetration Tester (Ethical Hacker)', label: 'Penetration Tester (Ethical Hacker)' },
        { value: 'Security Analyst', label: 'Security Analyst' },
        { value: 'Incident Responder', label: 'Incident Responder' },
        { value: 'Security Engineer (Cloud Security)', label: 'Security Engineer (Cloud Security)' },
        { value: 'Security Architect', label: 'Security Architect' },
        { value: 'Cryptographer', label: 'Cryptographer' },
        { value: 'Security Operations Center (SOC) Analyst', label: 'Security Operations Center (SOC) Analyst' }
    ],
    ['SQA Engineer']: [
        { value: 'Manual Tester', label: 'Manual Tester' },
        { value: 'Automation Engineer', label: 'Automation Engineer' },
        { value: 'Performance Tester', label: 'Performance Tester' },
        { value: 'Security Tester (Penetration Tester)', label: 'Security Tester (Penetration Tester)' },
        { value: 'Test Automation Architect', label: 'Test Automation Architect' },
        { value: 'Mobile App Tester', label: 'Mobile App Tester' },
        { value: 'Accessibility Tester', label: 'Accessibility Tester' }
    ],
    ['Python Developers']: [
        { value: 'Web Developer (Django/Flask)', label: 'Web Developer (Django/Flask)' },
        { value: 'Data Scientist', label: 'Data Scientist' },
        { value: 'Machine Learning Engineer', label: 'Machine Learning Engineer' },
        { value: 'Full Stack Developer (Python)', label: 'Full Stack Developer (Python)' },
        { value: 'Data Engineer', label: 'Data Engineer' },
        { value: 'DevOps Engineer (Python)', label: 'DevOps Engineer (Python)' }
    ],
    ['Dot Net Developer']: [,
        { value: 'Web Developer', label: 'Web Developer' },
        { value: 'Backend Developer', label: 'Backend Developer' },
        { value: 'Desktop Application Developer', label: 'Desktop Application Developer' },
        { value: 'Mobile App Developer', label: 'Mobile App Developer' },
        { value: 'API Developer', label: 'API Developer' },
        { value: 'Integration Developer', label: 'Integration Developer' }
    ],
    ['Full-Stack Developer']: [,
        { value: 'MEAN/MERN Stack Developer', label: 'MEAN/MERN Stack Developer' },
        { value: 'LAMP Stack Developer', label: 'LAMP Stack Developer' },
        { value: 'JAMstack Developer', label: 'JAMstack Developer' },
        { value: 'Serverless Developer', label: 'Serverless Developer' },
        { value: 'GraphQL Developer', label: 'GraphQL Developer' },
        { value: 'Microservices Developer', label: 'Microservices Developer' }
    ],
    ['LUA Developer']: [,
        { value: 'Lua Developer', label: 'Lua Developer' },
        { value: 'Game Developer', label: 'Game Developer' },
        { value: 'Scripting Engineer', label: 'Scripting Engineer' },
        { value: 'Web Developer (with Lua on the Backend)', label: 'Web Developer (with Lua on the Backend)' },
        { value: 'Network Programmer', label: 'Network Programmer' },
        { value: 'Scientific Computing and Data Analysis', label: 'Scientific Computing and Data Analysis' }
    ],
};


export const stackOptions = [
    {
        value: "mern",
        label: "MERN"
    },
    {
        value: "mean",
        label: "MEAN"
    },
    {
        value: "ror",
        label: "Ruby on Rails"
    },
    {
        value: "lamp",
        label: "LAMP"
    }
]



export const expOptions = [
    {
        value: "0-6",
        label: "0 - 6 Months"
    },
    {
        value: "6-11",
        label: "6 - 11 Months"
    },
    {
        value: "1-2year",
        label: "1 - 2 Years"
    },
    {
        value: "2-3year",
        label: "2 - 3 Years"
    },
    {
        value: "3-5years",
        label: "3 - 5 Years"
    },
    {
        value: "5-10years",
        label: "5 - 10 Years"
    },
    {
        value: "10+years",
        label: "10+ Years"
    },
]

export const techOptions = [
    {
        value: "react",
        label: "React Js"
    },
    {
        value: "angular",
        label: "Angular Js"
    },
    {
        value: "vue",
        label: "Vue Js"
    },
    {
        value: "php",
        label: "PHP"
    },
]



export const designationOptions = [
    {
        label: "React JS",
        value: "react",
    },
    {
        label: "Vue JS",
        value: "vue",
    },
    {
        label: "Angular JS",
        value: "angular",
    },
    {
        label: "Node JS",
        value: "node",
    },
    {
        label: "MERN Stack",
        value: "mern",
    },
    {
        label: "MEAN Stack",
        value: "mean",
    },
];




