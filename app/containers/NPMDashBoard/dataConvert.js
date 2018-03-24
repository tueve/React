import _ from 'lodash';

const cannotGet = '';

const metaDataPackage = (packageData) => packageData.map((item) => {
  const { packageInfo: { collected: { github, metadata, npm }, score } } = item;
  const { description,
          name,
          version,
          keywords,
          links,
          publisher: {
            username: author
            }
        } = metadata;

  const { homepage   = cannotGet,
          starsCount = cannotGet,
          issues     = cannotGet
        } = github || {};
  const downloads = _.map(npm.downloads, 'count');

  const contributors = github ?
                        github.contributors.length :
                        cannotGet;

  const {
    final : finalScore,
    detail: { quality, popularity, maintenance }
    } = score;

  return {
    description,
    name,
    version,
    keywords,
    author,
    links,
    downloads,
    homepage,
    starsCount,
    issues,
    contributors,
    finalScore,
    quality,
    popularity,
    maintenance
  };
});

export default metaDataPackage;
