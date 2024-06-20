import "dotenv/config";

const sonarProjects = await fetch(
  `https://sonarcloud.io/api/projects/search?organization=govuk-one-login&q=cri`,
  {
    headers: {
      Authorization: `Bearer ${process.env.SONARCLOUD_TOKEN}`,
    },
  }
);

process.stdout.write(JSON.stringify(await sonarProjects.json(), null, 2));
