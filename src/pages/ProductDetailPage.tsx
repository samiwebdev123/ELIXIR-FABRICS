import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { STORE_PHONE, STORE_WHATSAPP } from '../data/mockData';
import { ProductImageGallery } from '../components/product/ProductImageGallery';
import { SizeGuideModal } from '../components/product/SizeGuideModal';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/common/Button';
import { productService } from '../services/productService';
import { reviewService } from '../services/reviewService';
import { Product } from '../types';
import { DbReview } from '../types/supabase';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Check,
  Zap,
  Plus,
  Minus,
  Star,
  AlertCircle,
  MessageCircle,
  UserCheck
} from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export const ProductDetailPage: React.FC = () => {
  const { params, navigate } = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<DbReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sizing: User MUST select a size
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [sizeError, setSizeError] = useState<boolean>(false);

  // Color selection
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Review submission state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState('');

  // Custom Bespoke inputs (if user chooses custom)
  const [customChest, setCustomChest] = useState('');
  const [customWaist, setCustomWaist] = useState('');
  const [customLength, setCustomLength] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadProductData() {
      setIsLoading(true);
      setError(null);
      const targetId = params.id || 'prod-m-01';

      try {
        const prod = await productService.getProductById(targetId);
        if (!prod) {
          if (isMounted) {
            setError('Garment not found in our catalog.');
            setIsLoading(false);
          }
          return;
        }

        if (isMounted) {
          setProduct(prod);
          setSelectedColor(
            prod.colors && prod.colors.length > 0 ? prod.colors[0].name : prod.colorName
          );

          // Fetch related and reviews from Supabase in parallel
          const [related, revs] = await Promise.all([
            productService.getProducts({ gender: prod.gender, limit: 4 }),
            reviewService.getReviews(prod.id)
          ]);

          setRelatedProducts(related.filter((r) => r.id !== prod.id).slice(0, 4));
          setReviews(revs);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || 'Error loading product details.');
          setIsLoading(false);
        }
      }
    }

    loadProductData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      isMounted = false;
    };
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-pulse">
          <div className="lg:col-span-7 aspect-[3/4] bg-stone-200 rounded-3xl" />
          <div className="lg:col-span-5 space-y-6">
            <div className="h-6 bg-stone-200 rounded w-1/3" />
            <div className="h-10 bg-stone-200 rounded w-3/4" />
            <div className="h-6 bg-stone-200 rounded w-1/4" />
            <div className="h-24 bg-stone-200 rounded-2xl" />
            <div className="h-12 bg-stone-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen px-4 py-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="font-brand text-2xl text-neutral-900 font-medium">Garment Not Found</h2>
          <p className="text-xs text-neutral-500">
            {error || 'This luxury garment might have been archived or is temporarily out of stock.'}
          </p>
          <Button variant="primary" size="md" onClick={() => navigate('/shop')}>
            Browse Full Catalog
          </Button>
        </div>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const isCustomBespoke =
    selectedSize.toLowerCase().includes('custom') ||
    selectedSize.toLowerCase().includes('bespoke');

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    addToCart(
      product,
      selectedSize,
      selectedColor,
      quantity,
      isCustomBespoke
        ? {
            chest: customChest,
            waist: customWaist,
            length: customLength,
          }
        : undefined
    );

    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    addToCart(
      product,
      selectedSize,
      selectedColor,
      quantity,
      isCustomBespoke
        ? {
            chest: customChest,
            waist: customWaist,
            length: customLength,
          }
        : undefined
    );
    navigate('/checkout');
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    setIsSubmittingReview(true);
    try {
      const newRev = await reviewService.addReview({
        product_id: product.id,
        user_id: 'guest-user',
        user_name: reviewerName.trim(),
        rating: reviewRating,
        comment: reviewComment.trim()
      });
      setReviews((prev) => [newRev, ...prev]);
      setReviewSuccessMessage('Shukriya! Your verified review has been submitted.');
      setReviewComment('');
      setShowReviewForm(false);
      setTimeout(() => setReviewSuccessMessage(''), 4000);
    } catch {
      alert('Failed to submit review.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const whatsAppMessage = encodeURIComponent(
    `Hello ELIXIR Atelier, I am interested in ordering:
Product: ${product.title}
SKU: ${product.sku}
Size: ${selectedSize || 'Not Selected Yet'}
Color: ${selectedColor}
Quantity: ${quantity}
Price: PKR ${(product.price * quantity).toLocaleString()}
Please confirm availability for delivery in Pakistan.`
  );

  const toggleAccordion = (key: string) => {
    setActiveAccordion((prev) => (prev === key ? null : key));
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <button onClick={() => navigate('/')} className="hover:text-neutral-900">
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate(product.gender === 'women' ? '/women' : '/men')}
            className="hover:text-neutral-900 capitalize"
          >
            {product.gender}&apos;s Collection
          </button>
          <span>/</span>
          <button
            onClick={() =>
              navigate(
                product.gender === 'women'
                  ? `/women?category=${encodeURIComponent(product.category)}`
                  : `/men?category=${encodeURIComponent(product.category)}`
              )
            }
            className="hover:text-neutral-900"
          >
            {product.categoryLabel}
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-medium truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        {/* PDP Main Module: Left Gallery, Right Purchase Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Gallery (Carousel on Mobile, Large Gallery on Desktop) */}
          <div className="lg:col-span-7">
            <ProductImageGallery images={product.images} title={product.title} />
          </div>

          {/* Right: Contiguous Purchase Information */}
          <div className="lg:col-span-5 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-xs">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 uppercase tracking-widest font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="text-neutral-900 font-bold">{product.gender}</span>
                  <span>·</span>
                  <span>{product.categoryLabel}</span>
                </span>
                <span className="tabular-nums">SKU: {product.sku}</span>
              </div>

              <h1 className="font-brand text-2xl sm:text-3xl text-neutral-900 font-semibold mt-1">
                {product.title}
              </h1>

              <p className="text-xs text-neutral-500 mt-1">{product.subtitle}</p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-100 text-xs">
                <div className="flex items-center text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.round(product.rating || 5)
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-neutral-900">{product.rating || 4.9}</span>
                <span className="text-neutral-400">·</span>
                <span className="text-neutral-500">
                  {reviews.length || product.reviewCount || 12} customer reviews
                </span>
                {isSupabaseConfigured() && (
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                    Supabase Synced
                  </span>
                )}
              </div>

              {/* Price & Discount */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-brand text-2xl sm:text-3xl font-bold text-neutral-900 tabular-nums">
                  ₨ {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through tabular-nums">
                    ₨ {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <span className="text-xs text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full font-bold">
                    {product.discountPercentage}% OFF
                  </span>
                )}
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  Free Pakistan Shipping
                </span>
              </div>
            </div>

            {/* COLOR SELECTION */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-neutral-900">
                    Selected Color:
                  </span>
                  <span className="font-medium text-neutral-700">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor.toLowerCase() === c.name.toLowerCase();
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                          isSelected
                            ? 'border-neutral-900 bg-stone-50 shadow-xs ring-1 ring-neutral-900 font-semibold'
                            : 'border-stone-200 hover:border-neutral-400'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-2xs shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-neutral-800">{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Fabric & Fit Quick Spec */}
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Fabric Composition:</span>
                <span className="font-semibold text-neutral-900">{product.fabric}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Tailoring Fit:</span>
                <span className="font-semibold text-neutral-900">{product.fit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Garment Category:</span>
                <span className="font-semibold text-neutral-900">{product.categoryLabel}</span>
              </div>
            </div>

            {/* SIZE SELECTION - USER MUST SELECT SIZE */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                  Select Size <span className="text-red-500">*</span>:
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-neutral-600 hover:text-neutral-900 flex items-center gap-1 font-medium underline underline-offset-2"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>

              {sizeError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2 animate-bounce">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Please choose your size before adding to bag or buying now.</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedSize(s);
                        setSizeError(false);
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        isSelected
                          ? 'bg-neutral-900 text-white shadow-sm scale-102 ring-2 ring-neutral-900'
                          : sizeError
                          ? 'bg-red-50 border border-red-300 text-neutral-800 hover:bg-red-100'
                          : 'bg-stone-100 text-neutral-800 hover:bg-stone-200/80'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>

              {/* Custom Bespoke Measurement inputs if custom selected */}
              {isCustomBespoke && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 animate-in fade-in duration-200">
                  <p className="text-xs font-semibold text-neutral-900">
                    Bespoke Atelier Measurements (Optional):
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Leave blank if you prefer our master tailor to call you for measurements.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Chest (in)"
                      value={customChest}
                      onChange={(e) => setCustomChest(e.target.value)}
                      className="px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-neutral-900"
                    />
                    <input
                      type="text"
                      placeholder="Waist (in)"
                      value={customWaist}
                      onChange={(e) => setCustomWaist(e.target.value)}
                      className="px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-neutral-900"
                    />
                    <input
                      type="text"
                      placeholder="Length (in)"
                      value={customLength}
                      onChange={(e) => setCustomLength(e.target.value)}
                      className="px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* QUANTITY (+ and - controls) */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                Quantity:
              </span>
              <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-stone-200 text-neutral-700 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold text-neutral-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 hover:bg-stone-200 text-neutral-700 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* BUTTONS: ADD TO BAG & BUY NOW */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1 font-semibold"
                  onClick={handleAddToCart}
                  leftIcon={
                    isAddedSuccess ? (
                      <Check className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <ShoppingBag className="w-5 h-5" />
                    )
                  }
                >
                  {isAddedSuccess ? 'Added to Bag' : 'ADD TO BAG'}
                </Button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-2xl border transition-colors flex items-center justify-center ${
                    isFavorited
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-stone-50 border-stone-200 text-neutral-700 hover:text-neutral-900 hover:bg-stone-100'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* BUY NOW Button */}
              <Button
                variant="secondary"
                size="md"
                fullWidth
                className="font-semibold"
                onClick={handleBuyNow}
                leftIcon={<Zap className="w-4 h-4 text-amber-600" />}
              >
                BUY NOW
              </Button>

              {/* WhatsApp Direct Order Button with 03112989025 */}
              <a
                href={`https://wa.me/${STORE_WHATSAPP}?text=${whatsAppMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#075E54] hover:bg-[#128C7E] text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Order via WhatsApp ({STORE_PHONE})</span>
              </a>
            </div>

            {/* Delivery Information & Return Information */}
            <div className="pt-2 border-t border-stone-100 space-y-2.5 text-xs text-neutral-600">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 font-semibold block">Delivery Information:</strong>
                  <span>Express Courier (TCS / Leopards) delivered in 2–3 business days across Pakistan. Free delivery on orders above ₨ 5,000.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 font-semibold block">Cash on Delivery (COD):</strong>
                  <span>Inspect package at doorstep before handing payment to courier rider.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <RotateCcw className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 font-semibold block">Return &amp; Exchange Information:</strong>
                  <span>7-day easy exchange and return policy nationwide for sizing or fit adjustments.</span>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-stone-200 pt-4 divide-y divide-stone-100 text-xs">
              {/* Garment Details & Description Accordion */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="flex items-center justify-between w-full font-semibold text-neutral-900 text-left"
                >
                  <span>Description &amp; Fabric Details</span>
                  {activeAccordion === 'details' ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  )}
                </button>
                {activeAccordion === 'details' && (
                  <div className="mt-2.5 text-neutral-600 space-y-2">
                    <p className="leading-relaxed">{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1 text-neutral-600 mt-2">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Delivery & Returns Accordion */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="flex items-center justify-between w-full font-semibold text-neutral-900 text-left"
                >
                  <span>Pakistan Shipping Coverage</span>
                  {activeAccordion === 'shipping' ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  )}
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="mt-2.5 text-neutral-600 space-y-2 leading-relaxed">
                    <p>
                      Orders dispatched daily from Karachi to Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and all regional districts.
                    </p>
                    <p>
                      Payment accepted via Cash on Delivery, JazzCash, or Easypaisa.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section (Supabase Connected) */}
        <div className="pt-10 border-t border-stone-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-brand text-2xl text-neutral-900 font-semibold">
                Client Reviews &amp; Testimonials
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Authentic feedback from verified customers across Pakistan.
              </p>
            </div>
            <button
              onClick={() => setShowReviewForm((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors self-start sm:self-auto"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</span>
            </button>
          </div>

          {reviewSuccessMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium">
              {reviewSuccessMessage}
            </div>
          )}

          {/* Review Submission Form */}
          {showReviewForm && (
            <form onSubmit={handleAddReview} className="p-5 bg-white rounded-3xl border border-stone-200 space-y-4 max-w-xl">
              <h3 className="font-brand text-sm font-semibold text-neutral-900">
                Share your experience with this garment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Asad Siddiqui"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 font-medium"
                  >
                    <option value={5}>★★★★★ (5 - Excellent)</option>
                    <option value={4}>★★★★☆ (4 - Very Good)</option>
                    <option value={3}>★★★☆☆ (3 - Average)</option>
                    <option value={2}>★★☆☆☆ (2 - Below Expectations)</option>
                    <option value={1}>★☆☆☆☆ (1 - Poor)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                  Your Review Comments
                </label>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell us about the fabric quality, sizing fit, and stitching..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-neutral-900 resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isSubmittingReview}
              >
                Submit Review to Atelier
              </Button>
            </form>
          )}

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 bg-white rounded-2xl border border-stone-200/80 space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-neutral-700 text-xs font-bold">
                      {(rev.user_name || 'Customer').charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">
                        {rev.user_name || 'Verified Customer'}
                      </p>
                      <p className="text-[10px] text-neutral-400">
                        {rev.created_at ? new Date(rev.created_at).toLocaleDateString() : 'Recent Purchase'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rev.rating ? 'fill-current' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Curated Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-stone-200 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-brand text-xl sm:text-2xl text-neutral-900 font-semibold">
                More in {product.gender === 'men' ? "Men's" : "Women's"} Collection
              </h2>
              <button
                onClick={() => navigate(product.gender === 'men' ? '/men' : '/women')}
                className="text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-neutral-600"
              >
                View Full Collection
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        defaultGender={product.gender}
      />
    </div>
  );
};
