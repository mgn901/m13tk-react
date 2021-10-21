export type Lang = 'af' | 'sq' | 'ar-sa' | 'ar-iq' | 'ar-eg' | 'ar-ly' | 'ar-dz' | 'ar-ma'
	| 'ar-tn' | 'ar-om' | 'ar-ye' | 'ar-sy' | 'ar-jo' | 'ar-lb' | 'ar-kw' | 'ar-ae' | 'ar-bh'
	| 'ar-qa' | 'eu' | 'bg' | 'be' | 'ca' | 'zh-tw' | 'zh-cn' | 'zh-hk' | 'zh-sg' | 'hr' | 'cs'
	| 'da' | 'nl' | 'nl-be' | 'en' | 'en-us' | 'en-eg' | 'en-au' | 'en-gb' | 'en-ca' | 'en-nz'
	| 'en-ie' | 'en-za' | 'en-jm' | 'en-bz' | 'en-tt' | 'et' | 'fo' | 'fa' | 'fi' | 'fr' | 'fr-be'
	| 'fr-ca' | 'fr-ch' | 'fr-lu' | 'gd' | 'gd-ie' | 'de' | 'de-ch' | 'de-at' | 'de-lu' | 'de-li'
	| 'el' | 'he' | 'hi' | 'hu' | 'is' | 'id' | 'it' | 'it-ch' | 'ja' | 'ko' | 'lv' | 'lt' | 'mk'
	| 'mt' | 'no' | 'pl' | 'pt-br' | 'pt' | 'rm' | 'ro' | 'ro-mo' | 'ru' | 'ru-mi' | 'sz' | 'sr'
	| 'sk' | 'sl' | 'sb' | 'es' | 'es-ar' | 'es-gt' | 'es-cr' | 'es-pa' | 'es-do' | 'es-mx' | 'es-ve'
	| 'es-co' | 'es-pe' | 'es-ec' | 'es-cl' | 'es-uy' | 'es-py' | 'es-bo' | 'es-sv' | 'es-hn'
	| 'es-ni' | 'es-pr' | 'sx' | 'sv' | 'sv-fi' | 'th' | 'ts' | 'tn' | 'tr' | 'uk' | 'ur' | 've'
	| 'vi' | 'xh' | 'ji' | 'zu';

export type DictSrc<T = React.ReactNode> = {
	src: {
		[name in string]: {
			[lang in Lang]?: T;
		};
	},
	preferences: Lang[],
	fallback: string,
}

export type Dict<T extends string, U = React.ReactNode> = {
	[k in T]: U;
};
