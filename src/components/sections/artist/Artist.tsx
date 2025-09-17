import { imageMap } from "@/utils/utils";

const Artist = () => {
	return (
		<section id="artist" className="flex flex-col gap-y-7.5">
			<h2 className="text-2xl">Meet Máté Ilona - A Lifelong Dream Turned Reality</h2>
			<div className="flex flex-col gap-y-7.5 lg:flex-row lg:gap-x-7.5 lg:gap-y-0">
				<img
					src={imageMap["artist"]}
					alt="Máté Ilona"
					className="msm:w-3/4 self-center rounded-lg sm:w-2/3 lg:h-76 lg:w-auto lg:self-auto"
				/>
				<div className="flex flex-col gap-y-3">
					<p className="text-pretty">
						For most of my life, I worked in the world of numbers - meticulously managing ledgers, reports, and
						deadlines as an accountant. While I approached that work with care and professionalism, I always carried a
						quiet wish in the background: the desire to create with my hands. My heart belonged not to spreadsheets, but
						to threads, textures, and the peaceful rhythm of crafting.
					</p>
					<p className="text-pretty">
						Growing up, I admired traditional handcrafts, especially the delicate beauty of macramé. But life, as it
						often does, steered me down a more practical path. It wasn&rsquo;t until later - when the timing was finally
						right - that I allowed myself to return to this long-held passion. What began as a simple curiosity quickly
						blossomed into a calling.
					</p>
					<p className="text-pretty">
						Today, I pour my heart into every piece I make, weaving patience, tradition, and creativity into each knot.
						My work is not just decorative - it&rsquo;s personal. Every bracelet, necklace, and wall hanging reflects
						the joy of finally doing what I truly love.
					</p>
					<p className="text-pretty">
						My story is a reminder that it&rsquo;s never too late to pursue what sets your soul on fire. Each
						handcrafted creation I make carries that message: beauty made by hand is also beauty made with heart.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Artist;
