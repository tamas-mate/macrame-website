import { useAnchor } from "@/context/anchor-context";

const Artist = () => {
	const ref = useAnchor("artist");

	return (
		<section ref={ref} id="artist" className="flex flex-col gap-y-7.5">
			<h2 className="text-2xl">Meet Máté Ilona — A Lifelong Dream Turned Reality</h2>
			<p className="text-pretty">
				For most of her life, Máté Ilona worked in the world of numbers—meticulously managing ledgers, reports, and
				deadlines as an accountant. Though she approached her work with care and professionalism, there was always a
				quiet wish tucked away in the background: the desire to create with her hands. Her heart belonged not to
				spreadsheets, but to threads, textures, and the peaceful rhythm of crafting.
			</p>
			<p className="text-pretty">
				Growing up, she had always admired traditional handcrafts, especially the delicate beauty of macramé. But life,
				as it often does, steered her down a more practical path. It wasn't until later—when the timing was finally
				right—that she allowed herself to return to this long-held passion. What began as a simple curiosity quickly
				blossomed into a calling.
			</p>
			<p className="text-pretty">
				Today, Ilona pours her heart into every piece she makes, weaving patience, tradition, and creativity into each
				knot. Her work is not just decorative—it's personal. Every bracelet, necklace, and wall hanging reflects the joy
				of someone who finally gets to do what she truly loves.
			</p>
			<p className="text-pretty">
				Máté Ilona's story is a reminder that it's never too late to pursue what sets your soul on fire. Her handcrafted
				creations carry that message in every detail: that beauty made by hand is also beauty made with heart.
			</p>
		</section>
	);
};

export default Artist;
